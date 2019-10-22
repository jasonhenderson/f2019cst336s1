var express = require('express');
var router = express.Router();

/* GET user listing. (/users/928179308?name=jason) */
router.get('/:id', function(req, res, next) {
    console.log('user id', req.params.id);
    console.log('user name', req.query.name);
    res.status(200).json({
        id: req.params.id,
        name: req.query.name
    });
});

/* GET users listing. (/users) */
router.get('/', function(req, res, next) {
    res.render('details/users', {
        title: 'User list',
        users: [{
            id: '27878726',
            name: 'John Smith'
        }, {
            id: '111111',
            name: 'Jill Smith'
        }]
    });
});

/* POST user listing. (/users) */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* POST user listing. (/users) */
router.delete('/', function(req, res, next) {
    res.send('delete and respond with status');
});

/* POST user listing. (/users) */
router.head('/', function(req, res, next) {
    res.send('respond with a head');
});

module.exports = router;
