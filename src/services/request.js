const axios = require('axios');
const { sign } = require('../utils/sign');
const { createSigningString } = require('../utils/signingString');
const { getKeys } = require('../config/keys');

async function sendAuthenticatedRequest(url, data) {
    const keys = getKeys();
    const signingString = createSigningString(data);
    const signature = sign(signingString, keys.privateKey);

    const response = await axios.post(url, {
        data,
        signature,
        signingString
    });

    return response.data;
}

module.exports = { sendAuthenticatedRequest };