var express = require('express')
var app = express()

app.use((req, res, next) => {
    console.log('did i get here? (1)');

    req.commandName = 'Hello Jason, how is your day?';
    next();
});

app.use('/', function(req, res, next) {
    console.log('did i get here? (2)');

    res.send(`<h1>${req.commandName}</h1>`)
})

const useless = require('./useless');
app.use('/', useless.nothing);


const port = 8080;

console.log('listening on port', port);

app.listen(port)
