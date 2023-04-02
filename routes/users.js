var express = require('express');
var router = express.Router();

const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers/userController');

router.use(requiresAuth());
router.use(async (req, res, next) => {
    const localExists = await userController.exists(req.oidc.user.email);
    if (localExists) next();
    else res.redirect('/onboard');
});

router.get('/profile', async (req, res) => {
    const user = await userController.get(req.oidc.user.email);
    res.render('profile', { email: user.email, number: user.number, score: user.score, api_key: user.api_key });
});

router.post('/key_reset', async (req, res) => {
    const user = await userController.get(req.oidc.user.email);
    user.createKey();
    await user.save();
    res.redirect('/profile');
});


module.exports = router;
