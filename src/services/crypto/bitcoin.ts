import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc_btc from 'tiny-secp256k1';
import { WalletKeys, BitcoinAddresses } from '../../core/interfaces';
import * as crypto from 'crypto';

const ECPair = ECPairFactory(ecc_btc);

export async function generateBitcoinKeys(seed: Buffer): Promise<WalletKeys> {
    const hash = crypto.createHash('sha256').update(seed).digest();
    const keyPair = ECPair.fromPrivateKey(Buffer.from(hash));
    const { address: legacy } = bitcoin.payments.p2pkh({ 
        pubkey: Buffer.from(keyPair.publicKey) 
    });
    const { address: segwit } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ 
            pubkey: Buffer.from(keyPair.publicKey) 
        })
    });
    const { address: nativeSegwit } = bitcoin.payments.p2wpkh({ 
        pubkey: Buffer.from(keyPair.publicKey) 
    });

    return {
        privateKey: hash.toString('hex'),
        publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
        wif: keyPair.toWIF(),
        addresses: {
            legacy: legacy!,
            segwit: segwit!,
            nativeSegwit: nativeSegwit!
        }
    };
} 