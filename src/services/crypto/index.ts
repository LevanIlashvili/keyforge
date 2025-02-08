import { generateBitcoinKeys } from './bitcoin';
import { generateEthereumKeys } from './ethereum';
import { generateSolanaKeys } from './solana';
import { generateDogecoinKeys } from './dogecoin';
import { generateEOSKeys } from './eos';
import { NetworkConfig } from '../../core/interfaces';
import { MnemonicService } from '../mnemonic';

export async function generateKeys(mnemonic: string, network: NetworkConfig): Promise<any> {
    const seed = MnemonicService.toSeed(mnemonic);

    switch (network.protocol) {
        case 'bitcoin':
            return generateBitcoinKeys(mnemonic);
        case 'dogecoin':
            return generateDogecoinKeys(seed);
        case 'evm':
            return generateEthereumKeys(mnemonic);
        case 'eos':
            return generateEOSKeys(seed);
        case 'solana':
            return generateSolanaKeys(seed, network.path);
        default:
            throw new Error(`Unsupported protocol: ${network.protocol}`);
    }
}

export {
    generateBitcoinKeys,
    generateEthereumKeys,
    generateSolanaKeys,
    generateDogecoinKeys,
    generateEOSKeys
}; 