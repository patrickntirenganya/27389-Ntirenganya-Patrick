# Question 5: Task Management API

## Project Description
A lightweight RESTful API for managing personal tasks and to-do lists. This project demonstrates the use of specialized PATCH endpoints for state transitions (marking tasks complete) and filtering based on Boolean and String status fields.

## Features Implemented
- **Task Categorization**: Organize tasks by Priority levels: `LOW`, `MEDIUM`, or `HIGH`.
- **Status Filtering**: Filter tasks based on whether they are completed or pending.
- **Priority Filtering**: Retrieve tasks specifically assigned to a certain urgency level.
- **State Management**: 
    - Dedicated `PATCH` endpoint to mark tasks as completed without resubmitting the entire task body.
    - Full `PUT` support for editing task details and due dates.
- **Standardized Dates**: Uses `YYYY-MM-DD` format for consistent due date management.

---

## API Endpoints

### 1. Task Retrieval
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/tasks` | Retrieve all tasks in the system |
| **GET** | `/api/tasks/{taskId}` | Get details of a single task by ID |
| **GET** | `/api/tasks/status` | Filter by status (e.g., `?completed=true`) |
| **GET** | `/api/tasks/priority/{p}`| Filter by priority (LOW, MEDIUM, HIGH) |

### 2. Task Operations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/tasks` | Create a new task |
| **PUT** | `/api/tasks/{taskId}` | Update an existing task's details |
| **PATCH** | `/api/tasks/{id}/complete` | Specifically mark a task as completed |
| **DELETE** | `/api/tasks/{taskId}` | Remove a task from the list |

---

## Sample Task JSON
```json
{
    "taskId": 1,
    "title": "Finish Web Project",
    "description": "Complete all 5 REST API questions",
    "completed": false,
    "priority": "HIGH",
    "dueDate": "2026-02-15"
}