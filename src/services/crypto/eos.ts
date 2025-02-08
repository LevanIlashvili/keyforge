import * as ecc from 'eosjs-ecc';
import { WalletKeys } from '../../core/interfaces';
import * as crypto from 'crypto';

export async function generateEOSKeys(seed: Buffer): Promise<WalletKeys> {
    const hash = crypto.createHash('sha256').update(seed).digest('hex');
    const privateKey = await ecc.PrivateKey.fromHex(hash);
    const publicKey = privateKey.toPublic().toString();
    return {
        privateKey: privateKey.toWif(),
        publicKey
    };
}
