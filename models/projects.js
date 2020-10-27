const db = require ("../db")();
const COLLECTION = "projects";

module.exports = () => {
    const get = async () => {
        console.log('inside projects model');
        const projects = await db.get ( COLLECTION );
        return projects ;
    }

    const add = async (slug, name, description) =>{
        const results = await db.add(COLLECTION, {
            slug: slug,
            name: name,
            descrption: description,
        });
        return results.results;
    };

    return
    get;
    add;
}