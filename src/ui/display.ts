import chalk from 'chalk';
import { NetworkConfig, WalletKeys } from '../core/interfaces';
import { BaseDisplayService } from './display/base-display.service';
import { BitcoinDisplayService } from './display/bitcoin-display.service';
import { DogecoinDisplayService } from './display/dogecoin-display.service';
import { EVMDisplayService } from './display/evm-display.service';
import { SolanaDisplayService } from './display/solana-display.service';
import { EOSDisplayService } from './display/eos-display.service';

export class DisplayService extends BaseDisplayService {
    public display(wallet: WalletKeys): void {
        console.log(chalk.yellow('Private Key:  '), chalk.white(wallet.privateKey));
        console.log(chalk.yellow('Public Key:   '), chalk.white(wallet.publicKey));
    }

    public static display(wallet: WalletKeys): void {
        new DisplayService().display(wallet);
    }

    static async showWalletInfo(wallet: WalletKeys, network: NetworkConfig, mnemonic: string): Promise<void> {
        this.displayHeader(network.name);
        this.displayMnemonic(mnemonic);
        
        const displayServices: Record<string, typeof BaseDisplayService & { display: typeof DisplayService.display }> = {
            bitcoin: BitcoinDisplayService,
            dogecoin: DogecoinDisplayService,
            solana: SolanaDisplayService,
            evm: EVMDisplayService,
            eos: EOSDisplayService
        };
        
        const DisplayServiceClass = displayServices[network.protocol as keyof typeof displayServices] || DisplayService;
        DisplayServiceClass.display(wallet);
        
        this.displayFooter();
    }
} 