import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import { WalletKeys } from '../../core/interfaces';

export async function generateSolanaKeys(seed: Buffer, path: string): Promise<WalletKeys> {
    const { key } = derivePath(path, seed.toString('hex'));
    const keypair = Keypair.fromSeed(key);
    
    return {
        privateKey: Buffer.from(keypair.secretKey).toString('hex'),
        publicKey: keypair.publicKey.toBase58()
    };
} 