const db = require("../db")();
const ObjectId= require('mongodb').ObjectId;
const COLLECTION = "issues";
const comm = {comments:1}; 


module.exports = () =>{
    const get = async (issueNumber = null) =>{
        console.log('inside issues model');
        if(!issueNumber) {
            const issues = await db.get(COLLECTION);
            return issues;
        }
        const issue = await db.get(COLLECTION, {issueNumber});
        return issue;
    }

    const findComments = async () => {
        const comments = await db.find(COLLECTION, comm);
        return comments;
    }

    const add = async ({title, description, slug, status}) => {
        const issueCount = await db.count(COLLECTION);
        const projects = await db.get('projects', {slug});
        console.log(projects);
        const results = await db.add(COLLECTION, {
            issueNumber:  slug + "-" + (issueCount + 1),
            title: title,
            description: description,
            status: status,
            project_id:ObjectId(projects[0]._id),
            comments: [],
            
        });
        return results.result;
    }
    return{
        get,
        add,
        findComments
    }
};
