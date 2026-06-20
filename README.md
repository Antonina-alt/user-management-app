# User Management App

Full-stack web application with user registration, authentication, e-mail confirmation and user management table.

## Tech Stack

**Frontend:** React, Vite, Bootstrap, DataTables, Axios
**Backend:** Node.js, Express, PostgreSQL, JWT, bcrypt, Nodemailer

## Features

* Registration and login
* Cookie-based authentication
* E-mail confirmation
* User statuses: `unverified`, `active`, `blocked`
* Users table with sorting and multiple checkbox selection
* Toolbar actions: Block, Unblock, Delete, Delete unverified
* Admin page
* Database-level unique index for e-mail uniqueness
* Blocked users cannot log in
* Deleted users can register again

## Project Structure

```text
.
├── client
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── middleware
│   ├── migrations
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── utils
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── .gitignore
```
