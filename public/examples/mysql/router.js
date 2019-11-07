const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes', function(req, res, next) {

    const connection = mysql.createConnection({
        host: 'p2d0untihotgr5f6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'zsn9kncqtvumywkk',
        password: 'jrj24hhp4uchfj03',
        database: 'pvfhxur2aptwj0sr'
    });

    connection.connect();

    connection.query('SELECT * FROM ex_mysql_quote', function(error, results, fields) {
        if (error) throw error;
        console.log('The quotes are: ', results);

        res.render('../public/examples/mysql/quotes', {
            title: 'MySQL Example',
            quotes: results
        });
    });

    connection.end();

});

/* GET users listing. (/mysql) */
router.get('/', function(req, res, next) {

    const connection = mysql.createConnection({
        host: 'p2d0untihotgr5f6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'zsn9kncqtvumywkk',
        password: 'jrj24hhp4uchfj03',
        database: 'pvfhxur2aptwj0sr'
    });

    connection.connect();

    connection.query('SELECT 41 + 1 AS solution', function(error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);

        res.render('../public/examples/mysql/answer', {
            title: 'What is the answer?',
            answer: results[0].solution
        });
    });

    connection.end();

});

module.exports = router;
