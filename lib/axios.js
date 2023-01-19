const axios = require("axios");
const client = require("./redis");

const instance = axios.create({
    baseURL: `${process.env.API_URL}/api/`,
});

instance.interceptors.request.use(
    async function (config) {
        const token = await client.get("access_token");
        config.headers = {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

module.exports = instance;
