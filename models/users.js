const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {
    const get = async (email = null) => {
        console.log('inside users model');
        if(!email) {
            const users = await db.get(COLLECTION);
            return users;
        }

        return { error: 'byEmail not implemented yet'}
    };

    const add =async (name, email, usertype) => {
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
    }
}