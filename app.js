const express = require('express');
const app = express();
const port = 3000;
let bodyParser = require('body-parser');

app.use(bodyParser.json({ extended: false }));

app.get('/', (req, res) => {
    res.json({"Something defintely happened": "this is the main app route"});
    //TODO implement main app route
});

app.get('/location', (req, res) => {
    const location = +req.query.location;
    //TODO get data for specific location id (will this be a token or something?)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
