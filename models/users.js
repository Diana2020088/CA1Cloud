const db = require('../db')();
const COLLECTION = 'users';

module.exports = () => {
	const getByKey = async (key) => {
		if (!key) {
			console.log(' 01: Missing key');
			return null;
		}
		try {
			const users = await db.get(COLLECTION, { key });
			if (users.length !== 1) {
				console.log(' 02: Bad key');
				return null;
			}
			return users[0];
		} catch (ex) {
			console.log('--------- Exception users::getByKey');
			console.log(ex);
			return null;
		}
	};

	const get = async (email = null) => {
		console.log('inside users model');
		if (!email) {
			try {
				const users = await db.get(COLLECTION);
				console.log(users);
				return { usersList: users };
			} catch (ex) {
				console.log('----------- USERS GET ERROR');
				return { error: ex };
			}
		}
		try {
			const user = await db.get(COLLECTION, { email });
			return { usersList: users };
		} catch (ex) {
			return { error: ex };
		}
	};

	const add = async (name, email, usertype) => {
		if (!name || !email || !usertype) {
			return { error: 'All the fields have to be fill' };
		}
		const check = await db.get(COLLECTION, { email });
		if (check.length === 0) {
			const results = await db.add(COLLECTION, {
				name: name,
				email: email,
				usertype: usertype,
			});
			return results.result;
		} else {
			return { error: 'This email is already used' };
		}
	};
	return {
		get,
		add,
		getByKey,
	};
};
