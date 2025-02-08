import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from 'bip39';
import chalk from 'chalk';

export class MnemonicService {
    static generate(): string {
        const mnemonic = generateMnemonic();
        console.log(chalk.yellow('Mnemonic:     '), chalk.white(mnemonic));
        return mnemonic;
    }

    static validate(mnemonic: string): boolean {
        return validateMnemonic(mnemonic);
    }

    static toSeed(mnemonic: string): Buffer {
        return mnemonicToSeedSync(mnemonic);
    }
} 