const express = require('express');
const dotenv = require('dotenv');
const cors =  require('cors');
const request = require('request');
const app = express();

dotenv.config();
app.use(cors());

const apiPath = "/api/v2/tickets";

const OPTIONS = {
    headers: {
        'Content-Type': 'application/json'
    },
    auth: {
        username: process.env.KEY,
        password: process.env.TOKEN
    }
}

app.get('/tickets/:page?', (req, res) => {
    let url = process.env.BASE_URL + apiPath;
    if (req.params.page) {
        url = url + '?page=' + req.params.page;
    }
    request.get(url, OPTIONS, (err, resp) => {
        if (err) {
            res.status(500);
            res.send({ error: err });
        }
        else {
            data = resp.body;
            res.status(resp.statusCode);
            res.send(data);
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});