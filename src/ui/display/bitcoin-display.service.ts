import chalk from 'chalk';
import { WalletKeys } from '../../core/interfaces';
import { BaseDisplayService } from './base-display.service';

export class BitcoinDisplayService extends BaseDisplayService {
    public display(wallet: WalletKeys): void {
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
        console.log(chalk.yellow('WIF:          '), chalk.white(wallet.wif));
        console.log(chalk.yellow('Public Key:   '), chalk.white(wallet.publicKey));
        BitcoinDisplayService.displayDivider();
        console.log(chalk.magenta('Bitcoin Addresses:'));
        console.log(chalk.yellow('Legacy:       '), chalk.white(wallet.addresses?.legacy));
        console.log(chalk.yellow('SegWit:       '), chalk.white(wallet.addresses?.segwit));
        console.log(chalk.yellow('Native SegWit:'), chalk.white(wallet.addresses?.nativeSegwit));
    }

    public static display(wallet: WalletKeys): void {
        new BitcoinDisplayService().display(wallet);
    }
} 