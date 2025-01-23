import { generateSigningString } from '../src/utils/signingString';

describe('generateSigningString', () => {
    it('should construct the signing string correctly', () => {
        const inputData = {
            // Add necessary input data for testing
        };
        const expectedSigningString = 'expected signing string'; // Replace with the expected output

        const result = generateSigningString(inputData);
        expect(result).toBe(expectedSigningString);
    });

    // Add more test cases as needed
});