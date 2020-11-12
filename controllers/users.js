const users = require('../models/users.js')();

module.exports = () => {
	const getController = async (req, res) => {
		const { usersList, error } = await users.get();
		if (error) {
			return res.status(500).json({ error });
		}
		res.json({ users: usersList });
	};

	const getByEmail = async (req, res) => {
		res.json(await users.get(req.params.email));
	};

	const postController = async (req, res) => {
		const name = req.body.name;
		const email = req.body.email;
		const usertype = req.body.usertype;
		const { result, error } = await users.add(name, email, usertype);
		if (error) {
			res.status(400).json(error);
		}
		res.json(result);
	};
	return {
		getController,
		postController,
		getByEmail,
	};
};
