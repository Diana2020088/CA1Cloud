const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const DB_NAME = 'bug-tracker';
const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};
module.exports = () => {
	const count = (collectionName) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject('====== get::MongoClient.connect');
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);
				collection.countDocuments({}, (err, docs) => {
					if (err) {
						console.log('=======count::collection.countDocuments');
						console.log(err);
						return reject(err);
					}
					resolve(docs);
					client.close();
				});
			});
		});
	};
	const get = (collectionName, query = {}) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject('-=-=-=-=-get::MongoClient.connect');
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);

				collection.find(query).toArray((err, docs) => {
					if (err) {
						console.log('-=-=-=-=-get::collection.find');
						console.log(err);
						return reject(err);
					}
					resolve(docs);
					client.close();
				});
			});
		});
	};
	const add = (collectionName, item) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject('------------add::MongoClient.connect');
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);
				collection.insertOne(item, (err, result) => {
					if (err) {
						console.log('-----------add::collection.insertOne');
						console.log(err);
						return reject(err);
					}
					resolve(result);
					client.close();
				});
			});
		});
	};

	const find = (collectionName, query) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject('-+-+-+-+-+-+-+-+find::MongoClient.connect');
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);
				collection.find({}, { projection: query }).toArray((err, docs) => {
					if (err) {
						console.log('-+-+-+-+-+-+-+-+find::collection.find');
						console.log(err);
						return reject(err);
					}
					resolve(docs);
					client.close();
				});
			});
		});
	};

	const aggregate = (collectionName, pipeline = []) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject('-/-/-/-/-/-/-/aggregate::MongoClient.connect');
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);
				collection.aggregate(pipeline).toArray((err, docs) => {
					if (err) {
						console.log(' --- aggregate ERROR ---');
						console.log(err);
						return reject(err);
					}
					resolve(docs);
					client.close();
				});
			});
		});
	};

	const update = (collectionName, query = {}, newValues = {}) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject('·-·-·-·-·-·-·-update::MongoClient.connect');
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);
				collection.updateOne(query, newValues).toArray((err, docs) => {
					if (err) {
						console.log('·-·-·-·-·-·-·-update::collection.updateOne');
						console.log(err);
						return reject(err);
					}
					resolve(docs);
					client.close();
				});
			});
		});
	};

	return {
		count,
		get,
		add,
		find,
		aggregate,
		update,
	};
};
