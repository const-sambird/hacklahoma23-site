const User = require('../database/User');
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

module.exports = userController;
