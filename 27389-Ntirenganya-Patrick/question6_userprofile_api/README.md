# Bonus Question: User Profile API (Extra 20 Points)

## Project Description
An advanced User Profile Management system that implements a standardized communication protocol using a Generic Response Wrapper. This project demonstrates high-level Java concepts, including Generics, complex multi-parameter filtering, and refined RESTful state management.

## Advanced Features
- **Standardized API Response**: All endpoints return a consistent `ApiResponse<T>` structure containing a success flag, a descriptive message, and the data payload.
- **Generic Data Handling**: Uses Java Generics (`<T>`) to handle any data type within the response wrapper, ensuring type safety and reusability.
- **Multi-Criteria Search**: A robust search endpoint that filters by country, minimum age, and maximum age simultaneously.
- **Account Management**: Functionality to activate or deactivate user profiles via targeted `PATCH` updates.
- **Full Profile Management**: Comprehensive fields including Bio, Country, and Full Name with complete encapsulation.

---

## Standardized Response Format
Every request returns a structured JSON object:
```json
{
    "success": true, 
    "message": "User profile created successfully", 
    "data": {
        "userId": 1, 
        "username": "john_doe", 
        "email": "john@example.com",
        "fullName": "John Doe",
        "age": 25,
        "country": "USA",
        "bio": "Software Developer",
        "active": true
    }
}