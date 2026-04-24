📌 System Architecture

The system follows a client–server architecture, ensuring a clear separation between the frontend and backend.

Frontend: Next.js
Backend: Node.js with Express
Database: MongoDB

The frontend communicates with backend APIs, while the backend handles business logic and database operations.

📌 Database Design

The system is designed around three main entities:

User → Stores authentication details and user roles
Task → Stores task details and assignment information
ActivityLog → Tracks user actions for auditing and monitoring
Relationships:
A task is created by a user
A task is assigned to a user
Activity logs track all actions performed on tasks
📌 Key Decisions
Used JWT (JSON Web Token) for authentication to enable stateless and scalable API access
Implemented role-based access control (RBAC) to manage permissions effectively
Chose MongoDB for its flexible schema design
Added activity logging to improve transparency and track user actions
📌 Trade-offs
Real-time updates were not implemented due to time constraints
The UI is kept minimal to focus more on backend functionality
Validation for assigned user existence is not implemented (can be improved in future)
📌 Scaling Strategy

To support 10,000+ users, the system can be scaled by:

Adding database indexing to improve query performance
Using Redis caching for faster data access
Implementing load balancing to distribute traffic
Transitioning towards a microservices architecture
📌 Future Improvements

If given more time, the following features can be added:

A proper task update/edit UI
A user dropdown instead of manual ID input
Search and filtering functionality for better usability