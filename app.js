const express = require('express');
const app = express();
const port = 3000;
const http = require("https");
const locationRouter = require('./routes/locationRouter');

let bodyParser = require('body-parser');
const { callbackify } = require('util');

app.use(bodyParser.json({ extended: false }));

app.use('/api/location', locationRouter)

app.get('/', (req, res) => {
    //TODO implement main app route
    var result;
    var options = {
        host: 'api.covid19api.com',
        // path: '/country/canada/status/confirmed',
        path: '/dayone/country/canada/status/confirmed/live',
        headers: {
            'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
        }
    };

    var callback = function(response) {
    response.on('data', function (chunk) {
        result += chunk;
    });

    response.on('end', function () {
        //console.log(result);
        res.json(result); // SEND ACTUAL RESPONSE HERE
    });
    }
    var req = http.request(options, callback);
    req.end();
    
    
});

// app.get('/location', locationController.getStatsForLocation);

app.get('/all', (req, res) => {
    res.send("oh no the covids real bad");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));