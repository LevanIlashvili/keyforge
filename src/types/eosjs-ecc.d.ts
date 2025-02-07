declare module 'eosjs-ecc' {
    export class PrivateKey {
        static fromHex(hex: string): PrivateKey;
        toPublic(): PublicKey;
        toWif(): string;
    }

    export class PublicKey {
        toString(): string;
    }
} 