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
import { PromptService } from './ui/prompts';
import { DisplayService } from './ui/display';
import { MnemonicService } from './services/mnemonic';
import { generateKeys } from './services/crypto';

const ECPair = ECPairFactory(ecc_btc);

type Network = 'bitcoin' | 'ethereum' | 'libre' | 'solana' | 'dogecoin';

interface NetworkConfig {
    name: Network;
    path: string;
    chainId: number;
    isEVM: boolean;
    protocol?: 'bitcoin' | 'evm' | 'eos' | 'solana' | 'dogecoin';
}

const NETWORK_CONFIGS: NetworkConfig[] = [
    { name: 'bitcoin', path: "m/44'/0'/0'/0/0", chainId: 0, isEVM: false, protocol: 'bitcoin' },
    { name: 'libre', path: "m/44'/194'/0'/0/0", chainId: 0, isEVM: false, protocol: 'eos' },
    { name: 'ethereum', path: "m/44'/60'/0'/0/0", chainId: 1, isEVM: true, protocol: 'evm' },
    { name: 'solana', path: "m/44'/501'/0'/0'", chainId: 0, isEVM: false, protocol: 'solana' },
    { name: 'dogecoin', path: "m/44'/3'/0'/0/0", chainId: 0, isEVM: false, protocol: 'dogecoin' },
];

// Add Dogecoin network parameters
const DOGECOIN_NETWORK = {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bech32: 'dc',
    bip32: {
        public: 0x02facafd,
        private: 0x02fac398
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e
};

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

async function generateDogecoinKeys(seed: Buffer): Promise<{ 
    privateKey: string; 
    publicKey: string;
    address: string;
    wif: string;
}> {
    const hash = crypto.createHash('sha256').update(seed).digest();
    const keyPair = ECPair.fromPrivateKey(Buffer.from(hash), { network: DOGECOIN_NETWORK });
    
    const { address } = bitcoin.payments.p2pkh({ 
        pubkey: Buffer.from(keyPair.publicKey),
        network: DOGECOIN_NETWORK
    });

    return {
        privateKey: hash.toString('hex'),
        publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
        wif: keyPair.toWIF(),
        address: address!
    };
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
    } else if (network.protocol === 'dogecoin') {
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
        console.log(chalk.yellow('WIF:          '), chalk.white(wallet.wif));
        console.log(chalk.yellow('Public Key:   '), chalk.white(wallet.publicKey));
        console.log(chalk.green('-'.repeat(50)));
        console.log(chalk.magenta('Dogecoin Address:'));
        console.log(chalk.yellow('Address:      '), chalk.white(wallet.address));
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
    try {
        console.clear();
        console.log(chalk.blue('🔨 Welcome to KeyForge - Crypto Wallet Generator 🔨\n'));

        const { mode } = await PromptService.getMnemonicChoice();
        const mnemonic = mode === 'generate' 
            ? MnemonicService.generate()
            : await PromptService.getExistingMnemonic();

        const network = await PromptService.getNetwork();
        
        // Generate wallet
        console.log(chalk.cyan('\n⚙️  Generating wallet...'));
        const wallet = await generateKeys(mnemonic, network);

        // Display results
        await DisplayService.showWalletInfo(wallet, network, mnemonic);

        // Ask to continue
        const again = await PromptService.askToContinue();
        if (again) {
            await main();
        } else {
            console.log(chalk.green('\n👋 Thank you for using KeyForge!\n'));
        }
    } catch (error) {
        console.error(chalk.red('\n❌ Error:'), error instanceof Error ? error.message : 'Unknown error occurred');
        console.log(chalk.yellow('Please try again or report this issue if it persists.\n'));
        process.exit(1);
    }
}

// Start the application
if (require.main === module) {
    main().catch((error) => {
        console.error(chalk.red('Fatal error:'), error);
        process.exit(1);
    });
}

export { generateKeys }; 