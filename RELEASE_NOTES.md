# Release Notes

## Version 1.0.1 (2025-02-08)

🔄 Dogecoin Integration Update

### 🚀 Changes
- Added Dogecoin support with Legacy address format

### 🔧 Technical Details
- Added Dogecoin network parameters
- Implemented BIP44 path for Dogecoin (m/44'/3'/0'/0/0)
- Added WIF private key support for Dogecoin

## Version 1.0.0 (2025-02-08)

🎉 Initial release of KeyForge - A powerful multi-chain crypto wallet generator with a beautiful CLI interface.

### 🚀 Features

- **Multi-Chain Support**
  - Bitcoin
    - Legacy (P2PKH)
    - SegWit (P2SH-P2WPKH)
    - Native SegWit (P2WPKH) addresses
    - WIF format private keys
  - Ethereum
    - Standard addresses
    - Full EVM compatibility
  - Solana
    - Base58 encoded keys
    - BIP44 derivation path support
  - Libre (EOS)
    - EOS format keys
    - WIF format private keys

- **Key Generation**
  - BIP39 mnemonic generation and validation
  - Secure random number generation
  - Deterministic key derivation
  - Support for both new and existing mnemonics

- **User Interface**
  - Interactive CLI with clear prompts
  - Color-coded output for better readability
  - Clear warning messages for security
  - Progress indicators during key generation

### 💻 Technical Details

- **Supported Platforms**
  - macOS (x64)
  - Linux (x64)
  - Windows (x64)

- **Installation Options**
  - Standalone executables (no dependencies required)
  - Source installation via npm

- **Dependencies**
  - Node.js runtime (v14 or higher for source installation)
  - Core cryptographic libraries:
    - bip39 for mnemonic handling
    - bitcoinjs-lib for Bitcoin operations
    - ethers for Ethereum operations
    - @solana/web3.js for Solana operations
    - eosjs-ecc for Libre operations

### 🔒 Security Features

- All operations performed locally
- No external API calls
- No data storage
- No logging of sensitive information
- Clear security warnings and best practices

### 🛠️ Development Features

- Written in TypeScript
- Full type safety
- Modular architecture
- Easy to extend for new chains

### 📦 Installation

#### Standalone Executables
```bash
# macOS
chmod +x keyforge-macos
./keyforge-macos

# Linux
chmod +x keyforge-linux
./keyforge-linux

# Windows
keyforge-win.exe
```

#### From Source
```bash
git clone https://github.com/LevanIlashvili/keyforge
cd keyforge
npm install
npm start
```

### 🐛 Known Issues

- Some bytecode compilation warnings during packaging (does not affect functionality)
- Node.js v14 or higher required for source installation

### 🔜 Future Plans

- Support for more blockchain networks
- Custom derivation paths
- Batch key generation
- Hardware wallet integration
- Testing suite
- CI/CD pipeline

### 📝 Notes

- This is the initial stable release
- All core functionality has been implemented and tested
- Security audits are recommended before use in production
- Always backup your mnemonic phrases
- Use at your own risk

### 🙏 Acknowledgments

Thanks to all the open-source libraries that made this project possible:
- bitcoinjs-lib
- ethers
- @solana/web3.js
- eosjs-ecc
- And many more! 