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
    // Use HMAC-SHA512 for key derivation (BIP-32 compatible)
    const hmac = crypto.createHmac('sha512', 'Bitcoin seed');
    const I = hmac.update(seed).digest();
    const IL = I.slice(0, 32); // Private key is the first 32 bytes
    
    const keyPair = ECPair.fromPrivateKey(IL, { 
        network: DOGECOIN_NETWORK,
        compressed: true  // Ensure compressed public keys
    });
    
    const { address } = bitcoin.payments.p2pkh({ 
        pubkey: Buffer.from(keyPair.publicKey),
        network: DOGECOIN_NETWORK
    });

    return {
        privateKey: Buffer.from(IL).toString('hex'),
        publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
        wif: keyPair.toWIF(),
        address: address!
    };
} 