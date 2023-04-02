const { accountSid, authToken, from } = require('../credentials.json')
const User = require('../database/User');

const leaderboardController = {};

leaderboardController.defeated = to => {
    const client = require('twilio')(accountSid, authToken);
    client.messages.create({
        body: 'Your score on Nguyentendo was overtaken! Can you improve your time?',
        from: from,
        to: to
    })
    .then(message => console.log(message.sid))
    .catch(e => console.error);
};

leaderboardController.find = async () => {
    const data = await User
        .find()
        .limit(10)
        .sort('score')
        .select('email score');
    
    return data;
}

leaderboardController.highScoreTest = async (score, email) => {
    console.log('hst')
    const found = await User
        .find()
        .sort('score')
        .limit(1)        
        .select('email score phone');
    data = found[0]
    console.log(data)
    console.log(score, " ", email)
    console.log(data)
    
    if (email != data.email && score < data.score) {
        return data.phone;
    } else {
        return false;
    }
}

module.exports = exports = leaderboardController;
