import { verifySignature } from '../src/utils/verify';
import { readFileSync } from 'fs';
import { join } from 'path';

const keys = JSON.parse(readFileSync(join(__dirname, '../src/config/keys.js'), 'utf8'));

describe('Signature Verification', () => {
    it('should verify a valid signature', () => {
        const signingString = 'exampleSigningString';
        const validSignature = 'exampleValidSignature'; // Replace with an actual valid signature

        const result = verifySignature(signingString, validSignature, keys.publicKey);
        expect(result).toBe(true);
    });

    it('should not verify an invalid signature', () => {
        const signingString = 'exampleSigningString';
        const invalidSignature = 'exampleInvalidSignature'; // Replace with an actual invalid signature

        const result = verifySignature(signingString, invalidSignature, keys.publicKey);
        expect(result).toBe(false);
    });
});