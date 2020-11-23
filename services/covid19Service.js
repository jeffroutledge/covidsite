const http = require('https');

const getCovidStatsByCountry = async (req, res, location) => {
    console.log('we got the covid19 service working');

    var result;
    var options = {
        host: 'api.covid19api.com',
        // path: '/country/canada/status/confirmed',
        path: `/dayone/country/${location}/status/confirmed/live`,
        headers: {
            'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
        }
    };

    var callback = async function(response) {
    response.on('data', function (chunk) {
        result += chunk;
    });

    response.on('end', function () {
        res.status(200).json(result); // SEND ACTUAL RESPONSE HERE
    });
    }

    var req = http.request(options, callback);
    req.end();
    return;
}

module.exports = {
    getCovidStatsByCountry
}