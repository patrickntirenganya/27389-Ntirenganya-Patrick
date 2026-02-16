package library.question1_library_api.controller;

import library.question1_library_api.model.Book;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private List<Book> books = new ArrayList<>();

    public BookController() {
        // Sample of 3 books
        books.add(new Book(1L, "Atomic Habits", "James Clear", "978-0132350884", 2008));
        books.add(new Book(2L, "The 7 habits of effective people ", "stephen covey", "978-0134685991", 2017));
        books.add(new Book(3L, "Refactoring", "Martin Fowler", "978-0134757599", 2018));
    }

    // to display all books
    @GetMapping
    public List<Book> getAllBooks() {
        return books;
    }

    // to display  specific book by it's id
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable Long id) {
    return books.stream()
            .filter(b -> b.getId().equals(id))
            .findFirst()
            // If found,
            .map(book -> ResponseEntity.ok((Object) book)) 
            // If not found, return error
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Error: Book with ID " + id + " not found!"));
}
    // to Search book  by title
    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String title) {
        return books.stream()
                .filter(b -> b.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }

    // to Add a new book
    @PostMapping
    public ResponseEntity<String> addBook(@RequestBody Book book) {
    books.add(book);
    return new ResponseEntity<>("Book added successfully!", HttpStatus.CREATED);
}

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
    boolean removed = books.removeIf(b -> b.getId().equals(id));

    if (removed) {

        return ResponseEntity.ok("Book deleted successfully!");
    } else {
        // when book Not Found  return an error
        return new ResponseEntity<>("Error: Book not found!", HttpStatus.NOT_FOUND);
    }
    }
}