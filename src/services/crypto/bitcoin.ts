import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc_btc from 'tiny-secp256k1';
import { WalletKeys } from '../../core/interfaces';
import * as crypto from 'crypto';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';

const ECPair = ECPairFactory(ecc_btc);
const bip32 = BIP32Factory(ecc_btc);

export async function generateBitcoinKeys(mnemonic: string, index: number = 0): Promise<WalletKeys> {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const network = bitcoin.networks.bitcoin;
    const root = bip32.fromSeed(seed, network);
    const derivationPath = `m/84'/0'/0'/0/${index}`;
    const child = root.derivePath(derivationPath);
    
    const { address: legacy } = bitcoin.payments.p2pkh({ 
        pubkey: Buffer.from(child.publicKey),
        network 
    });
    
    const { address: segwit } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ 
            pubkey: Buffer.from(child.publicKey),
            network 
        }),
        network
    });
    
    const { address: nativeSegwit } = bitcoin.payments.p2wpkh({ 
        pubkey: Buffer.from(child.publicKey),
        network 
    });
    return {
        privateKey: Buffer.from(child.privateKey!).toString('hex'),
        publicKey: Buffer.from(child.publicKey).toString('hex'),
        wif: child.toWIF(),
        addresses: {
            legacy: legacy!,
            segwit: segwit!,
            nativeSegwit: nativeSegwit!
        }
    };
} 