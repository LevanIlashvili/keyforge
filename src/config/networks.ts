import { NetworkConfig } from '../core/interfaces';

export const NETWORK_CONFIGS: NetworkConfig[] = [
    { name: 'bitcoin', path: "m/44'/0'/0'/0/0", chainId: 0, isEVM: false, protocol: 'bitcoin' },
    { name: 'libre', path: "m/44'/194'/0'/0/0", chainId: 0, isEVM: false, protocol: 'eos' },
    { name: 'ethereum', path: "m/44'/60'/0'/0/0", chainId: 1, isEVM: true, protocol: 'evm' },
    { name: 'solana', path: "m/44'/501'/0'/0'", chainId: 0, isEVM: false, protocol: 'solana' },
    { name: 'dogecoin', path: "m/44'/3'/0'/0/0", chainId: 0, isEVM: false, protocol: 'dogecoin' }
]; 