import inquirer from 'inquirer';
import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';
import chalk from 'chalk';
import * as ecc from 'eosjs-ecc';
import * as crypto from 'crypto';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc_btc from 'tiny-secp256k1';

const ECPair = ECPairFactory(ecc_btc);

type Network = 'bitcoin' | 'ethereum' | 'libre' | 'solana';

interface NetworkConfig {
    name: Network;
    path: string;
    chainId: number;
    isEVM: boolean;
    protocol?: 'bitcoin' | 'evm' | 'eos' | 'solana';
}

const NETWORK_CONFIGS: NetworkConfig[] = [
    { name: 'bitcoin', path: "m/44'/0'/0'/0/0", chainId: 0, isEVM: false, protocol: 'bitcoin' },
    { name: 'libre', path: "m/44'/194'/0'/0/0", chainId: 0, isEVM: false, protocol: 'eos' },
    { name: 'ethereum', path: "m/44'/60'/0'/0/0", chainId: 1, isEVM: true, protocol: 'evm' },
    { name: 'solana', path: "m/44'/501'/0'/0'", chainId: 0, isEVM: false, protocol: 'solana' }
];

interface BitcoinAddresses {
    legacy: string;
    segwit: string;
    nativeSegwit: string;
}

async function generateBitcoinKeys(seed: Buffer): Promise<{ 
    privateKey: string; 
    publicKey: string;
    addresses: BitcoinAddresses;
    wif: string;
}> {
    const hash = crypto.createHash('sha256').update(seed).digest();
    const keyPair = ECPair.fromPrivateKey(Buffer.from(hash));
    const { address: legacy } = bitcoin.payments.p2pkh({ 
        pubkey: Buffer.from(keyPair.publicKey) 
    });
    const { address: segwit } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ 
            pubkey: Buffer.from(keyPair.publicKey) 
        })
    });
    const { address: nativeSegwit } = bitcoin.payments.p2wpkh({ 
        pubkey: Buffer.from(keyPair.publicKey) 
    });

    return {
        privateKey: hash.toString('hex'),
        publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
        wif: keyPair.toWIF(),
        addresses: {
            legacy: legacy!,
            segwit: segwit!,
            nativeSegwit: nativeSegwit!
        }
    };
}

async function generateSolanaKeys(seed: Buffer, path: string): Promise<{ privateKey: string; publicKey: string }> {
    const derived = derivePath(path, Buffer.from(seed).toString('hex'));
    const keyPair = Keypair.fromSeed(derived.key);
    return {
        privateKey: Buffer.from(keyPair.secretKey).toString('hex'),
        publicKey: keyPair.publicKey.toBase58()
    };
}

async function generateEOSKeys(seed: Buffer): Promise<{ privateKey: string; publicKey: string }> {
    const hash = crypto.createHash('sha256').update(seed).digest('hex');
    const privateKey = await ecc.PrivateKey.fromHex(hash);
    const publicKey = privateKey.toPublic().toString();
    return {
        privateKey: privateKey.toWif(),
        publicKey
    };
}

async function generateKeys(mnemonic: string, network: NetworkConfig): Promise<any> {
    const seed = mnemonicToSeedSync(mnemonic);

    switch (network.protocol) {
        case 'bitcoin':
            return generateBitcoinKeys(seed);
        case 'evm':
            return Wallet.fromPhrase(mnemonic);
        case 'eos':
            return generateEOSKeys(seed);
        case 'solana':
            return generateSolanaKeys(seed, network.path);
        default:
            throw new Error(`Unsupported protocol: ${network.protocol}`);
    }
}

async function displayWalletInfo(wallet: any, network: NetworkConfig, mnemonic: string) {
    console.log('\n' + chalk.green('='.repeat(50)));
    console.log(chalk.blue(`Wallet Info for ${network.name.toUpperCase()}`));
    console.log(chalk.green('='.repeat(50)));
    
    console.log(chalk.yellow('Mnemonic:     '), chalk.white(mnemonic));
    console.log(chalk.red('⚠️  Save this mnemonic safely - it\'s the only way to recover your wallet!'));
    console.log(chalk.green('-'.repeat(50)));

    if (network.protocol === 'bitcoin') {
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
        console.log(chalk.yellow('WIF:          '), chalk.white(wallet.wif));
        console.log(chalk.yellow('Public Key:   '), chalk.white(wallet.publicKey));
        console.log(chalk.green('-'.repeat(50)));
        console.log(chalk.magenta('Bitcoin Addresses:'));
        console.log(chalk.yellow('Legacy:       '), chalk.white(wallet.addresses.legacy));
        console.log(chalk.yellow('SegWit:       '), chalk.white(wallet.addresses.segwit));
        console.log(chalk.yellow('Native SegWit:'), chalk.white(wallet.addresses.nativeSegwit));
    } else if (network.isEVM) {
        console.log(chalk.yellow('Address:      '), chalk.white(wallet.address));
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
        console.log(chalk.yellow('Public Key:   '), chalk.white(wallet.publicKey));
    } else {
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
        console.log(chalk.yellow('Public Key:   '), chalk.white(wallet.publicKey));
    }
    
    console.log(chalk.green('='.repeat(50)) + '\n');
}

async function main() {
    console.clear();
    console.log(chalk.bold.rgb(255, 136, 0)('\n🌟 Welcome to KeyForge 🌟\n'));
    
        const { mode } = await inquirer.prompt([
            {
                type: 'list',
                name: 'mode',
                message: '🎯 What would you like to do?',
                choices: [
                    { name: '🆕 Generate new mnemonic and keys', value: 'generate' },
                    { name: '📝 Use existing mnemonic', value: 'existing' }
                ]
            }
        ]);

        let mnemonic: string;
        if (mode === 'generate') {
            mnemonic = generateMnemonic();
            console.log(chalk.green('\n✨ Generated New Mnemonic:'));
            console.log(chalk.yellow(mnemonic) + '\n');
        } else {
            const response = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'mnemonic',
                    message: '🔑 Enter your mnemonic phrase:',
                    validate: (input: string) => {
                        if (!validateMnemonic(input)) {
                            return '❌ Invalid mnemonic phrase. Please check and try again.';
                        }
                        return true;
                    }
                }
            ]);
            mnemonic = response.mnemonic;
        }

        const { network } = await inquirer.prompt([
            {
                type: 'list',
                name: 'network',
                message: '🌐 Select the network:',
                choices: NETWORK_CONFIGS.map(net => ({
                    name: net.name.charAt(0).toUpperCase() + net.name.slice(1),
                    value: net
                }))
            }
        ]);

        try {
            console.log(chalk.blue('\n⚙️  Generating keys...\n'));
            const wallet = await generateKeys(mnemonic, network);
            await displayWalletInfo(wallet, network, mnemonic);
        } catch (error) {
            console.error(chalk.red('❌ Error generating keys:'), error);
        }

        const { again } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'again',
                message: 'Would you like to generate more keys?',
                default: false
            }
        ]);

    if (again) {
        await main();
    } else {
        process.exit(0);
    }
}

main().catch(console.error); 