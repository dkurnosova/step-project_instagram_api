# Step project_Instagram API

This is the server-side component of the Instagram-like web application. It provides the necessary APIs and handles data storage using MongoDB. Below you will find instructions on how to run the project and an overview of its structure.

## Installation

To install the required dependencies, run the following command in the root directory of the project:

```sh
npm install
```
This will install all the necessary packages listed in the package.json file.

## Starting the Server

To start the server, run the following command:

```sh
npm start
```

For development purposes, you can use the following command to start the server with nodemon, which automatically restarts the server when changes are made:

```sh
npm run dev
```

## API Endpoints

The server provides the following API endpoints:

- GET /posts: Retrieves all posts.
- POST /posts: Creates a new post.
- PUT /posts/:postId/likes: Likes a post.
- POST /posts/:postId/comments: Adds a comment to a post.
- GET /users: Retrieves all users.
- GET /users/:userId: Retrieves a specific user by ID.
- POST /users: Creates a new user.
- PUT /users/:userId/subscriptions: Follows a user.
