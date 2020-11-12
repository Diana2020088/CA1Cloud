# Bug Tracker (API)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Example Usage](#example-usage)
* [Changelog](#changelog)
* [Roadmap](#roadmap)
* [Author info](#author-info)

## General info
This is an API that simulate a bug tracker. The app allows the user to add projects and issues at the same project.

## Technologies
* NodeJS - version 12.18.3
* MongoDB - version 3.6.2
* Heroku - version 7.44.0
* ExpressJS - version 4.17.1
* Nodemon - 2.0.6

## Setup
1. Clone the repo

`git clone https://github.com/Diana2020088/CA1Cloud/tree/ca2`

2. Install NPM packages

`
npm install
`

3. Execute 

`npm start run ` 


## Example Usage
The routes that were used for this project are following:

* Get all users app.get('/users', usersController.getController);
* Add an user app.post('/users', usersController.postController);
* Get an user by email app.get('/users/:email', usersController.getByEmail);
* Get all projects app.get('/projects', projectsController.getController);
* Add a project app.post('/projects', projectsController.postController);
* Get a project by slug app.get('/projects/:slug', projectsController.getBySlug);
* Get all issues app.get('/issues', issuesController.getController);
* Get an issue app.get('/issues/:issueNumber', issuesController.getByIssueNumber);
* Get all issues for a project app.get('/projects/:slug/issues', projectsController.populatedController);
* Add issue to project app.post('/projects/:slug/issues', issuesController.postController);
* Get all the comments app.get('/comments', issuesController.getComments);
* Get all the comments for an issue app.get('/issues/:issueNumber/comments', issuesController.commentsByIssue);
* Get comments by ID app.get('/issues/:issueNumber/comments/:id', issuesController.commentsById);

## Changelog
List of features done: 
 * Countinuos Assingment Part 1 for Colud-based Web Applications Course 
    - Add and retrieve data
    
        - Projects
            - Get all projects
            - Get individual project
            - Add new project individually
         - Users
            - Get all users
            - Get individually user
            - Add new users individually
         - Issues
            - Get all issues
            - Get all issues for a project
            - Get individual issues
            - Add new issues to a project individually
            - Issues have comments
                - Get all the comments for an issues
                - Get individual comments for an issues.
                
 * Countinuos Assingment Part 2 for Colud-based Web Applications Course 
    - Error checking implemented
    
        - All promises have a reject and any await calling a promise has a try-catch.
        - No dublicate users based on email
        - No duplicate projects based on slug
        - No add any item without all the fields.

## Roadmap
To-do list: 
- [ ] Start working on frontend
- [ ] Docker-ise the application

## Author info
Created by https://github.com/Diana2020088 - feel free to contact me!

