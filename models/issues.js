const db = require("../db")();
const COLLECTION = "issues";
const comm = {comments:1}; 

module.exports = () =>{
    const get = async (issueNumber = null) =>{
        console.log('inside issues model');
        if(!issueNumber) {
            const issues = await db.get(COLLECTION);
            return issues;
        }
        const issue = await db.get(COLLECTION, { issueNumber });
        return issue;
    }

    const findComments = async () => {
        const comments = await db.find(COLLECTION, {}, comm);
        return comments;
    }

    const add = async (title, description) => {
        const issueCount = await db.count(COLLECTION);
        const results = await db.add(COLLECTION, {
            issueNumber: issueCount + 1,
            title: title,
            description: description
        });
        return results.results;
    }
    return{
        get,
        add,
        findComments
    }
};
