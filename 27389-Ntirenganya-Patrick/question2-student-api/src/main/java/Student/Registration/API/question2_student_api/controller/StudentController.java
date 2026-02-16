package Student.Registration.API.question2_student_api.controller;

import Student.Registration.API.question2_student_api.model.Student;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private List<Student> students = new ArrayList<>();

    public StudentController() {
        // 5 sample students
        students.add(new Student(1L, "Alice", "Keza", "alice@auca.ac.rw", "Computer Science", 3.9));
        students.add(new Student(2L, "Bob", "Musa", "bob@auca.ac.rw", "Information Technology", 3.2));
        students.add(new Student(3L, "John", "Doe", "john@auca.ac.rw", "Computer Science", 3.6));
        students.add(new Student(4L, "Jane", "Smith", "jane@auca.ac.rw", "Business", 2.8));
        students.add(new Student(5L, "Kevin", "Ganza", "kevin@auca.ac.rw", "Computer Science", 3.5));
    }

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return students;
    }

    // Get student by ID
    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long studentId) {
        return students.stream()
                .filter(s -> s.getStudentId().equals(studentId))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Get all students by major
    @GetMapping("/major/{major}")
    public List<Student> getStudentsByMajor(@PathVariable String major) {
        return students.stream()
                .filter(s -> s.getMajor().equalsIgnoreCase(major))
                .collect(Collectors.toList());
    }

    // GET /api/students/filter?gpa={minGpa} - Filter by minimum GPA
    @GetMapping("/filter")
    public List<Student> filterByGpa(@RequestParam(name = "gpa") Double minGpa) {
        return students.stream()
                .filter(s -> s.getGpa() >= minGpa)
                .collect(Collectors.toList());
    }

    //Register a new student
    @PostMapping
    public ResponseEntity<String> registerStudent(@RequestBody Student student) {
        students.add(student);
        return new ResponseEntity<>("Student registered successfully", HttpStatus.CREATED);
    }

    // PUT /api/students/{studentId} - Update student information
    @PutMapping("/{studentId}")
    public ResponseEntity<String> updateStudent(@PathVariable Long studentId, @RequestBody Student updatedStudent) {
        for (int i = 0; i < students.size(); i++) {
            if (students.get(i).getStudentId().equals(studentId)) {
                students.set(i, updatedStudent);
                return ResponseEntity.ok("Student updated successfully");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
    }
}