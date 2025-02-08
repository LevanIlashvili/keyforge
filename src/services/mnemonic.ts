import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from 'bip39';

export class MnemonicService {
    static generate(): string {
        return generateMnemonic();
    }

    static validate(mnemonic: string): boolean {
        return validateMnemonic(mnemonic);
    }

    static toSeed(mnemonic: string): Buffer {
        return mnemonicToSeedSync(mnemonic);
    }
} 