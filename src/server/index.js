const express = require('express');
const axiosConfig = require('./custom-axios');

const app = express();
const port = process.env.PORT || 9007;
const LOCAL = 'api';
const IMGUR = 'imgur';
const ENDPOINT = `/${LOCAL}/${IMGUR}/*`;
const endpointexp = `/${LOCAL}/${IMGUR}`;
const clientId = '6d2e4b15c6dfd02';
const imgur = axiosConfig(clientId);


app.use(express.json());

// GET Imgur Requests
app.get(ENDPOINT, function (req, res) {
    
    const params = req.body;
    const originalUrl = req.originalUrl;
    const imgurUrl = originalUrl.replace(endpointexp, '');
    console.log(imgurUrl);
    
    imgur.get(imgurUrl, {
            params
        })
        .then(({ data }) => {
            res.send(data)
        })
        .catch((err) => {
            res.send({
                error: err.message
            });
        });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));