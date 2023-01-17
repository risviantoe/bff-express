const api = require("../../lib/axios");
const client = require("../../lib/redis");

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
		const data = await api.get("/user");
		console.log(data);

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

exports.token = (req, res) => {
	async function getToken() {
		const token = await client.get("access_token");
		return await token;
	}

	const token = getToken()
	console.log(token);
}
