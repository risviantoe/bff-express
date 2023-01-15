const redis = require('redis');
const client = redis.createClient({});

client.connect();
client.on('error', function (error) {
	console.log(error);
});

module.exports = client