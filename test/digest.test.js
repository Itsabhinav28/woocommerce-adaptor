import { generateDigest } from '../src/utils/digest';

describe('Digest Generation', () => {
    it('should generate a valid BLAKE2b-512 digest for given input', () => {
        const input = 'test input';
        const expectedDigest = 'expected_digest_value'; // Replace with the actual expected digest value
        const result = generateDigest(input);
        expect(result).toBe(expectedDigest);
    });

    it('should return a different digest for different inputs', () => {
        const input1 = 'input one';
        const input2 = 'input two';
        const digest1 = generateDigest(input1);
        const digest2 = generateDigest(input2);
        expect(digest1).not.toBe(digest2);
    });
});