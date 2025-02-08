import { Wallet } from 'ethers';
import { WalletKeys } from '../../core/interfaces';

export async function generateEthereumKeys(mnemonic: string): Promise<WalletKeys> {
    const wallet = Wallet.fromPhrase(mnemonic);
    return {
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
        address: wallet.address
    };
} 