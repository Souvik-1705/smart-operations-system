System Architecture

The system follows a client-server architecture.

Frontend: Next.js
Backend: Node.js + Express
Database: MongoDB

The frontend communicates with backend APIs, and the backend handles business logic and database operations.

Database Design

The system has three main entities:

User → stores authentication and role
Task → stores task details and assignment
ActivityLog → tracks user actions

Relationships:

A task is created by a user
A task is assigned to a user
Activity logs track actions on tasks
Key Decisions
Used JWT for authentication to enable stateless and scalable API access
Implemented role-based access control to manage permissions
Chose MongoDB for flexible schema design
Added activity logging for better transparency and tracking
Trade-offs
Did not implement real-time updates due to time constraints
UI is kept minimal to focus on backend functionality
No validation for assigned user existence (can be improved)
Scaling Strategy

If scaled to 10,000+ users:

Add database indexing
Use caching (Redis)
Implement load balancing
Move towards microservices
Future Improvements

If given more time:

Add task update UI
Add user dropdown instead of manual ID input
Add search and filtering