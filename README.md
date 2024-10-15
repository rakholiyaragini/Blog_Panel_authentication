## Blog Post Panel Project

## Overview

This project is a Blog Post Panel where users can register, log in, create, read, edit, and delete their blogs. Users can view blogs posted by others but can only modify their own. The project is built using a full-stack JavaScript framework with user authentication, blog management, and image uploading features.

## Project Stack

- **Frontend (UI)**: EJS (Embedded JavaScript)
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js (for user registration and login)
- **File Uploads**: Multer (for blog image uploads)

## Features

### User Authentication

- **Register**: Users can create an account.
- **Login**: Users can log in using Passport.js authentication.
- **forgotPassword**: Users can forgotPassword their password.
- **changePassword**: Users can change their password.
- **Session Management**: Use cookies/sessions to maintain user sessions.

### Management

- **Add Blog**: Users can create a blog post with a title, content, and an image (uploaded using Multer).
- **Edit Blog**: Users can edit their own blog posts.
- **Delete Blog**: Users can delete their own blog posts.
- **All Blog**: Users can edit their own blog posts.
- **Add Comment**: Users can Add comment on blog posts.
- **Add Topic**: Users can Add Topic.
- **Sub Topic**: Users can Add SubTopic.
- **Delete Topic & SubTopic**: Users can delete their own Topics & SubTopics.

### View Blogs

- **All Blogs Page**: A public page that shows all users' blogs in a view-only format.
- **My Blogs Page**: Logged-in users can view, edit, or delete their own blogs.

## Key Routes & Logic

### User Authentication Routes

- `POST /register`: Register a new user.
- `POST /login`: Log in an existing user using Passport.js.
- `GET /logout`: Log out the current user.
- `POST /forgotPasswordController`: forgotPassword.
- `GET /changePassword`: changePassword.

### Blog Routes

- `GET /blogs`: View all users' blogs.
- `GET /my-blogs`: View the logged-in user’s blogs (with options to edit/delete).
- `POST /blogs/add`: Add a new blog post (with file/image upload).
- `POST /blogs/edit/:id`: Edit a specific blog post (only by the blog’s author).
- `DELETE /blogs/delete/:id`: Delete a specific blog post (only by the blog’s author).
- `GET /addTopics`: addTopics.
- `GET /subTopic`: subTopic.
- `GET /deleteTopicAndSubTopics/:id`: Delete a specific Topic  (only by the Topic’s author).
- `POST /addComment/:id`: addComment.
- `GET /deletComment/:id`: Delete a specific comment (only by the blog’s author).


## Installation and Setup Project

### DataBase

- MongoDB

### Backend
- Node.js
- Express.js

### follow these steps to run project

2. Install:

   ```bash
   npm i nodemon
   ```

2. start:

   ```bash
   npm install
   ```
3. Set up the environment variables in a `.env` file:

   ```plaintext
   PORT=3004
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. Open the app in your browser:
   ```bash
   http://localhost:3004
   ```

## Folder Structure

```bash
/Blog-panel
 ├── /config // MongoDB database │
 ├── /views // EJS templates for frontend
 ├── /routes // Express.js routes for authentication and blogs
 ├── /controllers //  logic for handling requests
 ├── /auth // authentication
 ├── /models // Mongoose models (signUpmodel, Blog)
 ├── /uploads // Uploaded images
 ├── index.js // Main express.js
 └── package.json
```

**Contributor**: (https://github.com/rakholiyaragini)

If you have any Doubts or suggestions,  contact me at raginirakholiya123@gmail.com


