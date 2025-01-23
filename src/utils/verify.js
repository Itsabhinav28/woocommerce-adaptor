module.exports = function verifySignature(signingString, signature, publicKey) {
    const crypto = require('crypto');

    // Verify the signature using the public key
    const isVerified = crypto.verify(
        'SHA512',
        Buffer.from(signingString),
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        },
        Buffer.from(signature, 'base64')
    );

    return isVerified;
};