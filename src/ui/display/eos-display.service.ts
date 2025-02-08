import chalk from 'chalk';
import { WalletKeys } from '../../core/interfaces';
import { BaseDisplayService } from './base-display.service';

export class EOSDisplayService extends BaseDisplayService {
    public display(wallet: WalletKeys): void {
        console.log(chalk.yellow('Address:      '), chalk.white(wallet.publicKey));
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
    }

    public static display(wallet: WalletKeys): void {
        new EOSDisplayService().display(wallet);
    }
} 