const express = require('express');
const bodyParser = require('body-parser');
const { signRequest } = require('./src/utils/sign');
const { verifyRequest } = require('./src/utils/verify');
const { sendRequest } = require('./src/services/request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/authenticate', (req, res) => {
    const { data } = req.body;
    const signature = signRequest(data);
    const isValid = verifyRequest(data, signature);

    if (isValid) {
        res.status(200).json({ message: 'Authentication successful', signature });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
});

app.post('/api/send', (req, res) => {
    const { data } = req.body;
    const response = sendRequest(data);

    res.status(200).json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});