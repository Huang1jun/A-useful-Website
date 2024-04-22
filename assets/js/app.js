/*
Author       : mucNM1 
Name         : Education of college students
Version      : 1.0
*/

/*这是api接口端，请填写您的api */
// 本地ajax逻辑，端口为5500
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

const API_KEY = 'L7y0efjn82fQWgVkBInaTQNy';
const SECRET_KEY = 'hMeoskyFvT08nmRRV4pZo07ah7FFv78C';

const getAccessToken = async () => {
    const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token`;
    const params = {
        grant_type: 'client_credentials',
        client_id: API_KEY,
        client_secret: SECRET_KEY
    };
    try {
        const response = await axios.get(tokenUrl, { params });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

app.post('/api/query', async (req, res) => {
    console.log("Received POST request to /api/query");
    console.log("Request body:", req.body);

    const accessToken = await getAccessToken();
    if (!accessToken) {
        console.error('Failed to retrieve access token');
        return res.status(500).send({ error: 'Failed to retrieve access token' });
    }

    const apiURL = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=${accessToken}`;
    const payload = {
        messages: [
            {role: "user", content: req.body.question}
        ],
        temperature: 0.8,
        top_p: 0.9
    };

    try {
        const response = await axios.post(apiURL, payload, {
            headers: {'Content-Type': 'application/json'}
        });
        res.send({ result: response.data.result });
    } catch (error) {
        console.error('Error in making API request:', error.response ? error.response.data : error.message);
        res.status(500).send({ error: 'Something went wrong with the API request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
