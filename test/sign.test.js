// This file contains unit tests for the signing functionality.

const { sign } = require('../src/utils/sign');
const { readFileSync } = require('fs');
const path = require('path');

describe('Sign Function', () => {
    let privateKey;

    beforeAll(() => {
        // Load the private key from the keys.js file
        const keysPath = path.join(__dirname, '../src/config/keys.js');
        const keys = require(keysPath);
        privateKey = keys.privateKey;
    });

    test('should sign the signing string correctly', () => {
        const signingString = 'testSigningString';
        const signature = sign(signingString, privateKey);
        
        expect(signature).toBeDefined();
        expect(typeof signature).toBe('string');
    });

    test('should return a different signature for different signing strings', () => {
        const signingString1 = 'testSigningString1';
        const signingString2 = 'testSigningString2';
        
        const signature1 = sign(signingString1, privateKey);
        const signature2 = sign(signingString2, privateKey);
        
        expect(signature1).not.toEqual(signature2);
    });
});