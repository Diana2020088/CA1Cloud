const db = require ("../db")();
const COLLECTION = "projects";
const LOOKUP_ISSUES_PIPELINE = 
    {
        $lookup:{
            from: "issues",
            localField:"_id",
            foreignField: "project_id",
            as: "All the issues",
        }
    }

;

module.exports = () => {
    const get = async (slug = null) => {
        console.log('inside projects model');
        if (!slug) {
            const projects = await db.get(COLLECTION);
            return projects;
        }

        const project = await db.get(COLLECTION, {slug});
        return project;
    }

    const add = async (slug, name, description) =>{
        const results = await db.add(COLLECTION, {
            slug: slug,
            name: name,
            description: description,
        });
        return results.results;
    };

    const aggregateWithIssues = async (slug = null)  =>{
        if (!slug) {
            const projects = await db.aggregate(COLLECTION, [LOOKUP_ISSUES_PIPELINE]);
            return projects;
        }
        const projects = await db.aggregate(COLLECTION, [{$match: {slug: slug}}, LOOKUP_ISSUES_PIPELINE]);
        return projects;
    }

    return{
        get,
        add,
        aggregateWithIssues
    };
}