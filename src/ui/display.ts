import chalk from 'chalk';
import { NetworkConfig, WalletKeys } from '../core/interfaces';

export class DisplayService {
    static async showWalletInfo(wallet: WalletKeys, network: NetworkConfig, mnemonic: string): Promise<void> {
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
            console.log(chalk.yellow('Legacy:       '), chalk.white(wallet.addresses?.legacy));
            console.log(chalk.yellow('SegWit:       '), chalk.white(wallet.addresses?.segwit));
            console.log(chalk.yellow('Native SegWit:'), chalk.white(wallet.addresses?.nativeSegwit));
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
} 