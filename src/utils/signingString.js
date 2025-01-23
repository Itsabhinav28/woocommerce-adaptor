function constructSigningString(data, keys) {
    const { privateKey, publicKey } = keys;
    // Construct the signing string using the input data and keys
    const signingString = `${data.timestamp}.${data.nonce}.${data.payload}.${publicKey}`;
    return signingString;
}

module.exports = constructSigningString;