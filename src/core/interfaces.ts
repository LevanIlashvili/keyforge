import { Network, Protocol } from './types';

export interface NetworkConfig {
    name: Network;
    path: string;
    chainId: number;
    isEVM: boolean;
    protocol?: Protocol;
}

export interface BitcoinAddresses {
    legacy: string;
    segwit: string;
    nativeSegwit: string;
}

export interface WalletKeys {
    privateKey: string;
    publicKey: string;
    addresses?: BitcoinAddresses;
    wif?: string;
    address?: string;
} 