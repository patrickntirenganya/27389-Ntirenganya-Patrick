# Question 2: Student Registration API

## Project Overview
This project is a Spring Boot REST API designed to handle student registration and academic information management. It allows for filtering students by major and GPA, as well as updating existing student records using an in-memory storage system.

## Project Structure
* **Model**: `Student.Registration.API.question2_student_api.model.Student`
* **Controller**: Student.Registration.API.question2_student_api.controller.StudentController`

---

## How to Run the Application
1. **Open the project** in VS Code.
2. Ensure **JDK 17+** is installed.
3. Check `src/main/resources/application.properties` to ensure the port is set (defaulted to `8082` for this project).
4. Locate `src/main/java/library/question2_student_api/Question2StudentApiApplication.java`.
5. **Run** the main method.
6. The application will be accessible at `http://localhost:8082`.

---

## API Endpoints List

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/students` | Retrieve all registered students |
| GET | `/api/students/{studentId}` | Retrieve a specific student by ID |
| GET | `/api/students/major/{major}` | Find all students in a specific major |
| GET | `/api/students/filter?gpa={minGpa}` | Filter students with GPA >= minimum value |
| POST | `/api/students` | Register a new student |
| PUT | `/api/students/{studentId}` | Update an existing student's information |

---

## Sample Request & Response

### 1. Filter by Major (Computer Science)
**Request:** `GET http://localhost:8082/api/students/major/Computer Science`
**Response:** `200 OK`
```json
[
  {
    "studentId": 1,
    "firstName": "Alice",
    "lastName": "Keza",
    "email": "alice@auca.ac.rw",
    "major": "Computer Science",
    "gpa": 3.9
  }
]