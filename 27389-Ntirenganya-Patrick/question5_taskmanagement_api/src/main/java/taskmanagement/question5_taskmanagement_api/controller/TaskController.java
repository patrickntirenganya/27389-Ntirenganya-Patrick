package taskmanagement.question5_taskmanagement_api.controller;



import taskmanagement.question5_taskmanagement_api.model.Task;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private List<Task> tasks = new ArrayList<>();

    public TaskController() {
        // Initial sample tasks
        tasks.add(new Task(1L, "Submit Assignment", "Upload Java project", false, "HIGH", "2026-02-20"));
        tasks.add(new Task(2L, "Grocery Shopping", "Buy milk and eggs", true, "LOW", "2026-02-16"));
        tasks.add(new Task(3L, "Gym", "Leg day workout", false, "MEDIUM", "2026-02-15"));
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return tasks;
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long taskId) {
        return tasks.stream()
                .filter(t -> t.getTaskId().equals(taskId))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status")
    public List<Task> getByStatus(@RequestParam boolean completed) {
        return tasks.stream()
                .filter(t -> t.isCompleted() == completed)
                .collect(Collectors.toList());
    }

    @GetMapping("/priority/{priority}")
    public List<Task> getByPriority(@PathVariable String priority) {
        return tasks.stream()
                .filter(t -> t.getPriority().equalsIgnoreCase(priority))
                .collect(Collectors.toList());
    }

    @PostMapping
    public String createTask(@RequestBody Task task) {
        tasks.add(task);
        return "Task created successfully!";
    }

    @PutMapping("/{taskId}")
    public String updateTask(@PathVariable Long taskId, @RequestBody Task updatedTask) {
        for (int i = 0; i < tasks.size(); i++) {
            if (tasks.get(i).getTaskId().equals(taskId)) {
                tasks.set(i, updatedTask);
                return "Task updated!";
            }
        }
        return "Task not found";
    }

    @PatchMapping("/{taskId}/complete")
    public String markAsCompleted(@PathVariable Long taskId) {
        for (Task t : tasks) {
            if (t.getTaskId().equals(taskId)) {
                t.setCompleted(true);
                return "Task " + taskId + " marked as completed!";
            }
        }
        return "Task not found";
    }

    @DeleteMapping("/{taskId}")
    public String deleteTask(@PathVariable Long taskId) {
        boolean removed = tasks.removeIf(t -> t.getTaskId().equals(taskId));
        return removed ? "Task deleted" : "Task not found";
    }
}