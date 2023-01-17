const api = require("../../lib/axios");
const client = require("../../lib/redis");

exports.homepage = async (req, res) => {
    const user = await client.get("user");
    const userParser = JSON.parse(user);
    
    const division = await api.get("/division", userParser.division_id);
};
