import * as ecc from 'eosjs-ecc';
import { WalletKeys } from '../../core/interfaces';
import * as crypto from 'crypto';

export async function generateEOSKeys(seed: Buffer): Promise<WalletKeys> {
    const hash = crypto.createHash('sha256').update(seed).digest();
    const privateKey = ecc.PrivateKey.fromHex(hash.toString('hex'));
    const publicKey = privateKey.toPublic();

    return {
        privateKey: hash.toString('hex'),
        publicKey: publicKey.toString(),
        wif: privateKey.toWif()
    };
} 