const db = require ("../db")();
const COLLECTION = "projects";
//const SLUG = req.params['slug'];
const LOOKUP_ISSUES_PIPELINE = [
    // {$match: {slug: slug}},
    {
        $lookup:{
            from: "issues",
            localField:"_id",
            foreignField: "project_id",
            as: "Al the issues",
        }
    }

];

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
            const projects = await db.get(COLLECTION);
            return projects;
        }
        //const projects = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE);
        const projects = await db.aggregate(COLLECTION, [{$match: {slug: slug}},
            {
                $lookup:{
                    from: "issues",
                    localField:"_id",
                    foreignField: "project_id",
                    as: "All the issues",
                }
            }]);
        return projects;
    }

    return{
        get,
        add,
        aggregateWithIssues
    };
}