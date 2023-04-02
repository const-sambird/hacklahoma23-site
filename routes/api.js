var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.post('/score', async (req, res) => {
    const api_key = req.body.api_key;
    const score = req.body.score;
    const exists = await userController.api_match(api_key);
    if (!exists) {
        return res.send(401);
    }
    await userController.score(api_key, score);
    return res.send(200);
});

module.exports = router;
