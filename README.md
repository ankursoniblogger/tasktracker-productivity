# TaskTracker Productivity Backend

## Introduction
TaskTracker is a backend platform designed to help teams manage their tasks, track progress, and enhance productivity through collaborative tools and real-time updates.

## Project Type
Backend

## Deployed App
Backend: [https://your-backend-deploy-link.com](#)  
Database: MongoDB Atlas

## Directory Structure


tasktracker-productivity/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── .env
├── .gitignore
├── README.md
├── package.json
├── server.js


## Features
- User Authentication with JWT
- Task Creation, Update, Deletion
- Team Collaboration APIs
- Progress Tracking & Status
- Task Tagging & Comments
- Due Dates & Email Notifications

## Design Decisions or Assumptions
- JWT is used for secure authentication
- MongoDB Atlas is used for database
- Teams can have multiple members
- Tasks must be assigned to valid users and teams

## Installation & Getting Started

```bash
git clone https://github.com/your-username/tasktracker-productivity.git
cd tasktracker-productivity
npm install
npm start

## Usage


POST /api/auth/register
{
  "name": "Ankur Soni",
  "email": "ankur@example.com",
  "password": "password123"
}



## Credentials

Sample credentials for testing:

Email: demo@example.com

Password: password123


## API Endpoints

POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login
POST   /api/tasks                 - Create task
GET    /api/tasks                 - Get tasks
PUT    /api/tasks/:id             - Update task
DELETE /api/tasks/:id            - Delete task
POST   /api/teams                 - Create team
GET    /api/teams/:id/tasks       - Get team tasks
POST   /api/tasks/:id/comment     - Add comment


## Technology Stack


Node.js

Express.js

MongoDB & Mongoose

JWT

Nodemailer

Dotenv



