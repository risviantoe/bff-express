const axios = require("axios");
const client = require("./redis");

const token = client.get("access_token");
const api = axios.create({
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json, multipart/form-data",
	},
    baseURL: `${process.env.API_URL}/api/`,
});

module.exports = api;
