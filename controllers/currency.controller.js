const config = require('../config');
const http = require('http');

exports.getCurrency = async (req, res) => {
    http.get(`${config.currency_api}live?access_key=${config.currency_key}`, (currencyResponse) => {
        let chunks = [];
        currencyResponse.on('data', data => {
            chunks.push(data);
        }).on('end', function() {
            let data = Buffer.concat(chunks);
            let schema = JSON.parse(data);
            console.log(schema);
            if (schema) {
                res.status(200).send({
                    data: schema.quotes.USDVND
                })
            } else {
                res.status(400).send({
                    data: schema.error
                })
            }
        });
    });
};
