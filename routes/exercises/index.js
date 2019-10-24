var express = require('express');
var router = express.Router();

/* GET users listing. (/exercises/promises) */
router.get('/promises', function(req, res, next) {
    res.render('exercises/promises', {
        title: 'Promises Exercise'
    });
});


module.exports = router;
