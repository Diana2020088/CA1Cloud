const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {

    const getByKey = async (key) => {
        if (!key) {
            console.log(" 01: Missing key");
            return null;
        }
        const users = await db.get(COLLECTION, {key});
        if (users.length !== 1) {
            console.log(" 02: Bad key");
            return null;
        }
        return users[0];
    };

    const get = async (email = null) => {
        console.log('inside users model');
        if (!email) {
            const users = await db.get(COLLECTION);
            return users;
        }

        const user = await db.get(COLLECTION, {
            email
        });
        return user;
    };

    const add = async (name, email, usertype) => {
        const results = await db.add(COLLECTION, {
            name: name,
            email: email,
            usertype: usertype,
        });
        return results.results;
    };
    return {
        get,
        add,
        getByKey
    }
}