import chalk from 'chalk';
import { WalletKeys } from '../../core/interfaces';

export abstract class BaseDisplayService {
    protected static displayMnemonic(mnemonic: string): void {
        console.log(chalk.yellow('Mnemonic:     '), chalk.white(mnemonic));
        console.log(chalk.red('⚠️  Save this mnemonic safely - it\'s the only way to recover your wallet!'));
        console.log(chalk.green('-'.repeat(50)));
    }

    protected static displayDivider(): void {
        console.log(chalk.green('-'.repeat(50)));
    }

    protected static displayHeader(networkName: string): void {
        console.log('\n' + chalk.green('='.repeat(50)));
        console.log(chalk.blue(`Wallet Info for ${networkName.toUpperCase()}`));
        console.log(chalk.green('='.repeat(50)));
    }

    protected static displayFooter(): void {
        console.log(chalk.green('='.repeat(50)) + '\n');
    }

    abstract display(wallet: WalletKeys): void;
} 