const User = require('../database/User');
const leaderboardController = require('../controllers/leaderboardController');
const userController = {};

userController.exists = (email) => {
    return User.exists({ email: email });
};

userController.create = async (email, phone) => {
    const user = await User.create({ email: email, phone: phone, score: 0 });
    user.createKey();
    await user.save();
    return user;
}

userController.get = email => {
    return User.findOne({ email: email });
}

userController.api_match = api_key => {
    return User.exists({ api_key: api_key });
}

userController.score = async (api_key, score) => {
    const user = await User.findOne({ api_key: api_key });
    if (score < user.score || user.score == 0) {
        const second = await leaderboardController.highScoreTest(score, user.email);
        console.log(second)
        if (second) {
            leaderboardController.defeated(`+1${second}`);
        }
        user.score = score;
        await user.save();
    }
}

module.exports = userController;
