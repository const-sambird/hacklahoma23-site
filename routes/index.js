var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/onboard', requiresAuth(), (req, res) => {
    res.render('onboard');
})

router.post('/onboard', requiresAuth(), async (req, res) => {
    const number = req.body.number;
    const email = req.oidc.user.email;
    await userController.create(email, number);
    res.redirect('/users/profile');
});

module.exports = router;
