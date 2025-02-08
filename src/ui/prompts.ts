import inquirer from 'inquirer';
import { NetworkConfig } from '../core/interfaces';
import { NETWORK_CONFIGS } from '../config/networks';
import { MnemonicService } from '../services/mnemonic';

export class PromptService {
    static async getMnemonicChoice(): Promise<{ mode: 'generate' | 'existing' }> {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'mode',
                message: '🎯 What would you like to do?',
                choices: [
                    { name: '🆕 Generate new mnemonic and keys', value: 'generate' },
                    { name: '📝 Use existing mnemonic', value: 'existing' }
                ]
            }
        ]);
    }

    static async getExistingMnemonic(): Promise<string> {
        const { mnemonic } = await inquirer.prompt([
            {
                type: 'password',
                name: 'mnemonic',
                message: '🔑 Enter your mnemonic phrase:',
                validate: (input: string) => {
                    if (!MnemonicService.validate(input)) {
                        return 'Invalid mnemonic phrase. Please check and try again.';
                    }
                    return true;
                }
            }
        ]);
        return mnemonic;
    }

    static async getNetwork(): Promise<NetworkConfig> {
        const { network } = await inquirer.prompt([
            {
                type: 'list',
                name: 'network',
                message: '🌐 Select target network:',
                choices: NETWORK_CONFIGS.map(config => ({
                    name: config.name.charAt(0).toUpperCase() + config.name.slice(1),
                    value: config
                }))
            }
        ]);
        return network;
    }

    static async askToContinue(): Promise<boolean> {
        const { again } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'again',
                message: '🔄 Would you like to generate another wallet?',
                default: false
            }
        ]);
        return again;
    }

    // Add other prompt methods here
} 