const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes', function(req, res, next) {

    // Get a query string value for filter
    const nameFilter = req.query.name;

    const connection = mysql.createConnection({
        host: 'p2d0untihotgr5f6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'zsn9kncqtvumywkk',
        password: 'jrj24hhp4uchfj03',
        database: 'pvfhxur2aptwj0sr'
    });

    connection.connect();

    connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
WHERE a.firstName LIKE '${nameFilter}'
`,
        function(error, results, fields) {
            if (error) throw error;
            console.log('The quotes are: ', results);

            res.render('../public/labs/9/view', {
                title: 'Lab 9',
                quotes: results
            });
        });

    connection.end();

});

module.exports = router;
