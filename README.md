# KeyForge 🔥

A powerful multi-chain crypto wallet forge - craft your keys with precision. Generate and manage cryptocurrency wallets across multiple blockchain networks with an elegant CLI interface.

```ascii
 _  __          _____                      
| |/ /___ _   _|  ___|__  _ __ __ _  ___ 
| ' // _ \ | | | |_ / _ \| '__/ _` |/ _ \
| . \  __/ |_| |  _| (_) | | | (_| |  __/
|_|\_\___|\__, |_|  \___/|_|  \__, |\___|
          |___/               |___/      
```

## ✨ Features

- 🔐 Generate new mnemonics or use existing ones
- 🌐 Multi-chain support:
  - Bitcoin (Legacy, SegWit, and Native SegWit addresses)
  - Ethereum (and other EVM chains)
  - Solana
  - Libre (EOS-based)
- 🛡️ Secure key generation using industry-standard libraries
- 🎨 Beautiful interactive CLI interface
- 💾 Deterministic wallet generation from mnemonics
- ⚡ Support for different address formats
- 🔍 Clear and organized output display
- 📦 Available as standalone executable for Windows, macOS, and Linux

## 🚀 Quick Start

### Prerequisites

- Option 1 (Standalone Executable):
  - None! Just download and run the executable for your platform

- Option 2 (From Source):
  - Node.js (v14 or higher)
  - npm or yarn

### Installation

#### Option 1: Standalone Executable

1. Download the appropriate executable for your platform from the releases page:
   - `keyforge-macos` for macOS
   - `keyforge-linux` for Linux
   - `keyforge-win.exe` for Windows

2. Make the file executable (macOS/Linux):
```bash
chmod +x keyforge-macos  # or keyforge-linux
```

3. Run the executable:
```bash
# macOS
./keyforge-macos

# Linux
./keyforge-linux

# Windows (via Command Prompt)
keyforge-win.exe
```

#### Option 2: From Source

1. Clone the repository:
```bash
git clone <repository-url>
cd keyforge
```

2. Install dependencies:
```bash
npm install
```

3. Run the forge:
```bash
npm start
```

### Build Your Own Executable

If you want to build the executable yourself:

1. Clone and install dependencies as shown above
2. Run the package command:
```bash
npm run package
```

This will create executables for all platforms in the `bin` directory.

## 💻 Usage

1. Choose your forging mode:
   - Generate new mnemonic and keys
   - Use existing mnemonic

2. If using existing mnemonic:
   - Enter your 12/24-word mnemonic phrase
   - KeyForge will validate the mnemonic

3. Select your target network:
   - Bitcoin
   - Ethereum
   - Solana
   - Libre

4. View your forged wallet information:
   - Mnemonic (save this safely!)
   - Private Key
   - Public Key
   - Addresses (network-specific formats)

## 🔑 Supported Key Types

### Bitcoin
- Legacy Address (P2PKH)
- SegWit Address (P2SH-P2WPKH)
- Native SegWit Address (P2WPKH)
- WIF Format Private Keys

### Ethereum
- Standard Ethereum Address
- Private Key
- Public Key

### Solana
- Base58 Encoded Public Key
- Private Key

### Libre
- EOS Format Public Key
- WIF Format Private Key

## ⚠️ Security Notes

1. **Never share your private keys or mnemonic phrases**
2. **Always backup your mnemonic phrase in a secure location**
3. **Verify addresses before using them for transactions**
4. **Run this tool in a secure environment**
5. **Consider using hardware wallets for large amounts**

## 🛠️ Development

### Build the project:
```bash
npm run build
```

### Run in development mode:
```bash
npm run dev
```

### Package the application:
```bash
npm run package
```

The packaging process uses `pkg` to create standalone executables for:
- macOS (x64)
- Linux (x64)
- Windows (x64)

Note: During packaging, you may see some bytecode compilation warnings. These are related to optimization and don't affect the functionality of the executables.

### Development Stack
- TypeScript for type-safe development
- Node.js for runtime
- pkg for executable packaging
- Jest for testing (coming soon)

## 📚 Dependencies

- `bip39`: Mnemonic generation and validation
- `bitcoinjs-lib`: Bitcoin address generation
- `ethers`: Ethereum wallet functionality
- `@solana/web3.js`: Solana wallet functionality
- `eosjs-ecc`: Libre/EOS key generation
- `inquirer`: Interactive CLI interface
- `chalk`: Terminal styling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## ⚡ Performance

The tool generates keys instantly and uses minimal system resources. All cryptographic operations are performed locally on your machine.

## 🔒 Privacy

- No data is sent to external servers
- All operations are performed locally
- No logs are maintained
- No keys are stored

## 🐛 Troubleshooting

If you encounter any issues:

1. Ensure you have the latest Node.js version
2. Try clearing npm cache: `npm cache clean --force`
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. Verify your mnemonic phrase if using existing one

## 📞 Support

For issues and feature requests, please create an issue in the repository. 