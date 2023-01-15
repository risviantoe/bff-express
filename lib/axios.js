const axios = require('axios');

const api = axios.create({
	baseURL: `${process.env.API_URL}/api/`,
	'Content-Type': 'application/json, multipart/form-data',
});

module.exports = api;