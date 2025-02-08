import chalk from 'chalk';
import { WalletKeys } from '../../core/interfaces';
import { BaseDisplayService } from './base-display.service';

export class SolanaDisplayService extends BaseDisplayService {
    public display(wallet: WalletKeys): void {
        console.log(chalk.yellow('Address:      '), chalk.white(wallet.address));
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
    }

    public static display(wallet: WalletKeys): void {
        new SolanaDisplayService().display(wallet);
    }
} 