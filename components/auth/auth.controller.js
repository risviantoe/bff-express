const api = require("../../lib/axios");
const client = require("../../lib/redis");
const util = require("util");
const get = util.promisify(client.get).bind(client);

exports.login = async (req, res) => {
    try {
        const { data } = await api.post(`/auth/login`, req.body);

        const accessToken = data.access_token;
        const tokenExp = data.expires_in;
        client.set("access_token", accessToken);
        client.expire("access_token", tokenExp);

        const { access_token, token_type, expires_in, ...user } = data;
        client.set("user", JSON.stringify(user));

        const { role, chapter_finish, ...response } = data.user;
        response["role_id"] = data.user.role.id;

        res.status(200).send({
            status: 200,
            message: "Login successfully!",
            data: response,
        });
    } catch (error) {
        error?.response?.status
            ? res.status(error?.response?.status).send(error.message)
            : res.status(400).send(error.message);
    }
};

exports.user = async (req, res) => {
    try {
        const token = await client.get("access_token");
        const { data } = await api.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        res.status(200).send({
            status: 200,
            message: "Get user successfully!",
            data: data,
        });
    } catch (error) {
        error?.response?.status
            ? res.status(error?.response?.status).send({
                  status: error.response.status,
                  message: error.message,
              })
            : res.status(400).send({
                  status: 400,
                  message: error.message,
              });
    }
};

exports.logout = async (req, res) => {
    const deleteToken = await client.del("access_token");
    client.expire("access_token", 0);
    if (deleteToken === 0) {
        res.status(400).send({
            status: 400,
            message: "Logout failed! Token not found",
        });
        return;
    }

    res.status(200).send({
        status: 200,
        message: "Logout successfully!",
    });
};

exports.refresh = async (req, res) => {
    try {
        const token = await client.get("access_token");
        const { data } = await api.post("/auth/refresh", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        res.send(data)
    } catch (error) {
        res.send(error);
    }
};
