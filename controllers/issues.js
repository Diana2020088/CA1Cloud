const issues = require ('../models/issues.js')();

module.exports = () => {
    const getController = async (req, res) =>{
        res.json(await issues.get());
    }

    const getByIssueNumber = async (req, res) => {
        res.json(await issues.get(req.params.issueNumber));
    }

    const getComments = async (req, res) => {
        res.json(await issues.find());
    }

    const postController = async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const result = await users.add(title, description);
        res.json(result);
    }
    return {
        getController,
        postController,
        getByIssueNumber,
        getComments
    }
}