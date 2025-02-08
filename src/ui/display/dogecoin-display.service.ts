import chalk from 'chalk';
import { WalletKeys } from '../../core/interfaces';
import { BaseDisplayService } from './base-display.service';

export class DogecoinDisplayService extends BaseDisplayService {
    public display(wallet: WalletKeys): void {
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
        console.log(chalk.yellow('WIF:          '), chalk.white(wallet.wif));
        console.log(chalk.yellow('Public Key:   '), chalk.white(wallet.publicKey));
        DogecoinDisplayService.displayDivider();
        console.log(chalk.magenta('Dogecoin Address:'));
        console.log(chalk.yellow('Address:      '), chalk.white(wallet.address));
    }

    public static display(wallet: WalletKeys): void {
        new DogecoinDisplayService().display(wallet);
    }
} 