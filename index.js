const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const projectsController = require("./controllers/projects")();
const usersController = require("./controllers/users")();
const issuesController = require("./controllers/issues")();

const app = (module.exports = express());

//logging
app.use((req, res, next) => {
    //Display log for request
    console.log("[%s] %s --%s", new Date(), req.method, req.url);
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
//Get all the comments fon an issue
app.get("/issues/:issueNumber/comments", issuesController.commentsByIssue);
//Get comments by ID
app.get("/issues/:issueNumber/comments/:id", issuesController.commentsById);


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