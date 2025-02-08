import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc_btc from 'tiny-secp256k1';
import { WalletKeys } from '../../core/interfaces';
import * as crypto from 'crypto';

const ECPair = ECPairFactory(ecc_btc);

const DOGECOIN_NETWORK = {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bech32: 'doge',
    bip32: {
        public: 0x02facafd,
        private: 0x02fac398
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e
};

export async function generateDogecoinKeys(seed: Buffer): Promise<WalletKeys> {
    const hash = crypto.createHash('sha256').update(seed).digest();
    const keyPair = ECPair.fromPrivateKey(Buffer.from(hash), { network: DOGECOIN_NETWORK });
    const { address } = bitcoin.payments.p2pkh({ 
        pubkey: Buffer.from(keyPair.publicKey),
        network: DOGECOIN_NETWORK
    });

    return {
        privateKey: hash.toString('hex'),
        publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
        wif: keyPair.toWIF(),
        address: address!
    };
} 