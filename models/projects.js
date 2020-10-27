const db = require ("../db")();
const COLLECTION = "projects";

module.exports = () => {
    const get = async () => {
        console.log('inside projects model');
        const authors = await db.get ( COLLECTION );
        return authors ;
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