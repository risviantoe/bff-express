const api = require('../../lib/axios');
const client = require('../../lib/redis');

exports.login = async (req, res) => {
	try {
		const { data } = await api.post(`/auth/login`, req.body);
		const access_token = data.access_token;
		client.set('access_token', access_token);

		const { role, chapter_finish, ...response } = data.user
		res.send(response);
	} catch (error) {
		error?.response?.status
			? res.status(error?.response?.status).send(error.message)
			: res.send(error.message);
	}
};

exports.user = async (req, res) => {
	try {
		const token = await client.get(
			'access_token',
			function (error, result) {
				if (error) {
					console.error(error);
				} else {
					return result;
				}
			}
		);

		const { data } = await api.get('/user', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		res.send(data);
	} catch (error) {
		error?.response?.status
			? res.status(error?.response?.status).send(error.message)
			: res.send(error.message);
	}
};
