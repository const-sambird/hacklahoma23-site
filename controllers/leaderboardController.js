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

module.exports = exports = leaderboardController;
