const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
// });

app.use(bodyParser.urlencoded({extended: false}));

app.post('/contact-form', (req, res) => {
    let obj = {
        name: req.body.name,
        email: req.body.email
    };
    fs.appendFile('log.json', JSON.stringify(obj), () => {
        console.log('hello');
    });
    res.redirect('/formsubmissions');
});

app.get('/formsubmissions', (req, res) => {
    fs.readFile("./log.json", (err, data) => {
        if (err) throw err;
        res.type("text").send(data);
    });
});

// app.get('/',(req, res, next) => {
//     res.send("Hello from the web server side...");
// });

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);