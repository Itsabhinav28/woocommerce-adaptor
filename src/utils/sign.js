module.exports = function sign(signingString, privateKey) {
    const crypto = require('crypto');

    const sign = crypto.createSign('SHA256');
    sign.update(signingString);
    sign.end();

    const signature = sign.sign(privateKey, 'base64');
    return signature;
};