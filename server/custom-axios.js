const axios = require('axios');

module.exports = (clientId) => {
    return axios.create({
        baseURL: 'https://api.imgur.com/3/',
        timeout: 30000,
        headers: {
            'Authorization': `Client-ID ${clientId}`
        }
    })
};