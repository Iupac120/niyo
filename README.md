��#   n i y o 
 Documentation Overview

API Endpoints
POST /api/users/register: Register a new user.
POST /api/users/login: Authenticate a user and get a token.
GET /api/tasks: Retrieve a list of tasks (protected).
POST /api/tasks: Create a new task (protected).
PUT /api/tasks/:id: Update a task by ID (protected).
DELETE /api/tasks/:id: Delete a task by ID (protected).

Data Models
User:
username: String, required, unique
password: String, required

Task:
title: String, required
user: ObjectId, reference to User, required
Running Your API
To run your API and access the documentation:


Start your MongoDB server.
Start your Express server:
bash
Copy code
node server.js
Navigate to http://localhost:5000/api-docs to view your API documentation.
