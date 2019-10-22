var express = require('express');
var router = express.Router();

/* GET users listing. (/exercises/routing) */
router.get('/', function(req, res, next) {
    res.render('exercises/routing', {
        title: 'Routing Exercise'
    });
});

/* POST user listing. (/exercises/routing) */
router.post('/:action', function(req, res, next) {
    console.log('user id', req.params.id);
    console.log('user name', req.query.name);
    const data = req.body;
    data.action = req.params.action; // from the route on line 12
    data.confirmation = "message received";
    
    res.status(200).json(data);
});

module.exports = router;
