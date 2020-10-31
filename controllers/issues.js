const issues = require ('../models/issues.js')();

module.exports = () => {
    const getController = async (req, res) =>{
        res.json(await issues.get());
    }

    const getByIssueNumber = async (req, res) => {
        res.json(await issues.get(req.params.issueNumber));
    }

    const getComments = async (req, res) => {
        res.json(await issues.findComments());
    }


    const commentsByIssue = async(req, res) => {
        res.json(await issues.getCommentsForIssue(req.params.issueNumber));
    }

    const commentsById = async(req, res) => {
        res.json(await issues.getOneCommentById(req.params.issueNumber, parseInt(req.params.id)));
    }


    const postController = async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const slug = req.params.slug;
        const status = req.body.status;
        const result = await issues.add(title, description, slug, status);
        res.json(result);
    }

    const postComment = async (req, res) => {
        const text = req.body.text;
        const id = parseInt(req.body.id);
        const author = req.body.author;
        const issueNumber = req.params.issueNumber;
        const result = await issues.addComment(issueNumber, text, id, author);
        res.json(result);

    }


    return {
        getController,
        postController,
        getByIssueNumber,
        getComments,
        commentsByIssue,
        commentsById,
        postComment
    }
}