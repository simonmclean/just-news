require('dotenv').config()
const withOffline = require('next-offline')

module.exports = withOffline({
    env: {
        newsApiKey: process.env.NEWS_API_KEY
    },
});
