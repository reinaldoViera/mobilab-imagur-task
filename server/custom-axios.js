const axios = require('axios');

module.exports = (clientId) => {
    return axios.create({
        baseURL: 'https://api.imgur.com/3/',
        timeout: 10000,
        headers: {
            'Authorization': `Client-ID ${clientId}`
        }
    })
};