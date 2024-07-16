# User Management API

This is a Node.js Express application that provides a RESTful API for user management, including signup, login, update, and delete functionalities. It uses MongoDB for data storage and Multer for handling file uploads.

## Features

- User signup with profile picture upload
- User login
- Update user information
- Delete user
- MongoDB integration
- File upload handling

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB Atlas account or local MongoDB instance
- npm (Node Package Manager)

## Installation

1. Clone the repository:

- ```git clone https://github.com/your-username/user-management-api.git```

 2. Navigate to the project directory:

 - ```cd user-management-api```
 3. Install the dependencies:
 - ```npm install```
 4. Create a `.env` file in the root directory and add the following:
 - ```DATABASE_URL=your_mongodb_connection_string PORT=5000```


 ## Usage

To start the server, run:
```npm start```
The server will start running on the port specified in your `.env` file.

## API Endpoints

- POST `/signup`: Create a new user account
- POST `/login`: User login
- PUT `/update/:id`: Update user information
- DELETE `/delete/:id`: Delete a user account