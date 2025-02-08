import chalk from 'chalk';
import { WalletKeys } from '../../core/interfaces';
import { BaseDisplayService } from './base-display.service';

export class EVMDisplayService extends BaseDisplayService {
    public display(wallet: WalletKeys): void {
        console.log(chalk.yellow('Address:      '), chalk.white(wallet.address));
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
        console.log(chalk.yellow('Public Key:   '), chalk.white(wallet.publicKey));
    }

    public static display(wallet: WalletKeys): void {
        new EVMDisplayService().display(wallet);
    }
}   