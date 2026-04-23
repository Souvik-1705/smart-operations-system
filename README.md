#  Smart Operations System

A full-stack internal operations system designed to improve task management, user accountability, and workflow visibility within an organization.

---

##  Overview

This system was built as part of a Full Stack Developer assignment to demonstrate:

* Product thinking
* Scalable system design
* Role-based access control
* Clean backend architecture

---

##  Tech Stack

### Frontend

* Next.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT (JSON Web Token)

---

##  Features

### 1. Authentication System

* User Signup & Login
* Secure password hashing using bcrypt
* JWT-based authentication

---

### 2. Role-Based Access Control (RBAC)

| Role    | Permissions                      |
| ------- | -------------------------------- |
| Admin   | Full access + view activity logs |
| Manager | Create & assign tasks            |
| User    | View & update assigned tasks     |

---

### 3. Task Management System

* Create tasks
* Assign tasks to users
* Update task status
* Role-based task visibility

---

###  4. Activity Log System (Custom Feature)

Tracks all key user actions such as:

* Task creation
* Task updates
* User activity tracking

**Why added?**
To improve transparency, accountability, and system observability.

---

##  Database Design

### User

* name
* email
* password
* role

### Task

* title
* description
* status
* assignedTo (User reference)
* createdBy (User reference)

### ActivityLog

* action
* user (User reference)
* task (Task reference)

---

## 🔌 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Tasks

* POST `/api/tasks`
* GET `/api/tasks`
* PUT `/api/tasks/:id`

### Activity Logs

* GET `/api/activity/logs` (Admin only)

---

## 📮 API Collection

The Postman collection is available in the `/postman` folder.

 Import the JSON file into Postman to test all APIs.

 Replace `YOUR_TOKEN` with the token received from login.

---

##  System Architecture

```
Frontend (Next.js)
        ↓
Backend (Express API)
        ↓
Database (MongoDB)
```

---

##  Key Decisions

* Used JWT for stateless authentication
* Implemented RBAC for structured permissions
* Chose MongoDB for flexible schema design
* Added Activity Logs for auditability

---

##  Trade-offs

* No real-time updates (WebSockets not implemented)
* No notification system (time constraint)
* UI kept minimal to focus on backend architecture

---

##  Scaling Strategy

If scaled to 10,000+ users:

* Add database indexing
* Use Redis caching
* Implement load balancing
* Move towards microservices architecture

---

## 🚀 Future Improvements

If given more time:

* Notifications system
* Task comments & collaboration
* Advanced dashboard & analytics
* Search & filtering

---

##  Setup Instructions

### 1. Clone repository

```
git clone <your-repo-url>
```

---

### 2. Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
PORT=5000
```

Run:

```
npm run dev
```

---

### 3. Frontend Setup

```
cd client
npm install
npm run dev
```

---

##  Author

Souvik Biswas

---

##  Final Note

This project focuses on building a clean, scalable, and real-world system rather than just implementing basic CRUD operations.
