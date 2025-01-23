import { blake2b } from 'blakejs';

export function generateDigest(data) {
    const input = typeof data === 'string' ? data : JSON.stringify(data);
    const digest = blake2b(input, null, 64);
    return Buffer.from(digest).toString('hex');
}