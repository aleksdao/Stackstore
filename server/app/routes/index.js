'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/experiences', require('./experiences'));
router.use('/cart', require('./cart'));
router.use('/categories', require('./categories'));
// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
