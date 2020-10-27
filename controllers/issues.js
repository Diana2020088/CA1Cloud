const issues = require('../models/issues.js')();

module.exports = () => {
    const getController = async (req, res) => {
        res.json(await issues.get());
    }
    const getBySlug = async (req, res) => {
        res.json(await issues.get(parseInt(req.params.issueNumber)));
    }
    const postController = async (req, res) =>{
        const title = req.body.title;
        const description = req.body.description;
        const results = await issues.add(title, description);
        res.json(results);
    }

    return{
    getController,
    postController,
    getBySlug
    }
}