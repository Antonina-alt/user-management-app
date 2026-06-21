
# User Management App

**User Management App** is a full-stack web application created for managing registered users.

The application allows users to create an account, confirm their email address, log in, and access a protected user management page. Authenticated users can view all registered users in a table and perform bulk actions such as blocking, unblocking, deleting users, or deleting unverified accounts.

The project demonstrates authentication, cookie-based sessions, email confirmation, PostgreSQL data storage, protected API routes, and a responsive user interface.

- Live app: https://user-management-wii2.onrender.com/login

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Bootstrap
- DataTables

### Backend

- Node.js
- Express
- PostgreSQL
- JWT
- bcryptjs
- cookie-parser
- CORS
- SendGrid

---


## Features

### Authentication

- User registration
- User login and logout
- JWT-based authentication
- HTTP-only cookie storage
- Protected routes
- Session validation
- Automatic redirect when the session is expired or invalid

### Email Confirmation

- Email confirmation after registration
- Confirmation link sent via SendGrid
- User status update after successful confirmation
- Handling of invalid or expired confirmation links

### User Management

- Users table
- User statuses:
    - `unverified`
    - `active`
    - `blocked`
- Multiple user selection
- Bulk block users
- Bulk unblock users
- Bulk delete users
- Delete all unverified users
- Blocked users cannot log in
- Deleted users can register again

### UI

- Responsive layout
- Bootstrap-based styling
- DataTables integration
- Sorting support
- Toolbar actions
- Status notifications

---

## Project Structure

```text
.
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── constants
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
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
└── README.md