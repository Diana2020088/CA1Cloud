const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const projectsController = require("./controllers/projects")();
const usersController = require("./controllers/users")();
const issuesController = require("./controllers/issues")();

const users = require("./models/users")();

const app = (module.exports = express());

//logging
app.use((req, res, next) => {
    //Display log for request
    console.log("[%s] %s --%s", new Date(), req.method, req.url);
    next();
});

app.use(async (req, res, next) => {
    const FailedAuthMessage = {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
        error: "Failed Authentication",
        message: "Go away!",
        code: "xxx", // Some useful error code
    };
    const suppliedKey = req.headers["x-api-key"];
    const clientIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    // Check Pre-shared key
    if (!suppliedKey) {
        console.log(
            " [%s] FAILED AUTHENTICATION -- %s, No Key Supplied",
            new Date(), clientIp );
        FailedAuthMessage.code = "01";
        return res.status(401).json(FailedAuthMessage);
    }
    const user = await users.getByKey(suppliedKey);
    if (!user) {
        console.log(
            " [%s] FAILED AUTHENTICATION -- %s, BAD Key Supplied",
            new Date(),
            clientIp
        );
        FailedAuthMessage.code = "02";
        return res.status(401).json(FailedAuthMessage);
    }
    next();
});

app.use(bodyParser.json());

//Get all users
app.get("/users", usersController.getController);
//Add an user
app.post("/users", usersController.postController);
//User
app.get("/users/:email", usersController.getByEmail);

//Get all projects
app.get("/projects", projectsController.getController);
//Add a project
app.post("/projects", projectsController.postController);
//A Project
app.get("/projects/:slug", projectsController.getBySlug);

//all issues
app.get("/issues", issuesController.getController);
//Get an issue
app.get("/issues/:issueNumber", issuesController.getByIssueNumber);
//Gett all issues for a project
app.get("/projects/:slug/issues", projectsController.populatedController)
// Add issue to project
app.post("/projects/:slug/issues", issuesController.postController);

//All comments
app.get("/comments", issuesController.getComments);
//Get all the comments for an issue
app.get("/issues/:issueNumber/comments", issuesController.commentsByIssue);
//Get comments by ID
app.get("/issues/:issueNumber/comments/:id", issuesController.commentsById);
//Add new comments to an issue
app.post("issues/:issueNumber/comments", issuesController.postComment);


app.listen(port, hostname, () => {
    console.log(`Server running at http:// ${ hostname } : ${ port } /`);
});

//404
app.use((req, res) => {
    res.status(404).json({
        error: 404,
        message: "Route not found",
    });
});