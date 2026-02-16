package restaurant.question3_restaurant_api.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import restaurant.question3_restaurant_api.model.MenuItem;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private List<MenuItem> menuItems = new ArrayList<>();

    public MenuController() {
        // Challenge: Adding 8 sample items
        // IMPORTANT: Just type the values. Do NOT type "id:", "name:", etc.
        menuItems.add(new MenuItem(1L, "Samosa", "Spicy veggie triangles", 5.0, "Appetizer", true));
        menuItems.add(new MenuItem(2L, "Spring Rolls", "Crunchy veg rolls", 6.0, "Appetizer", true));
        menuItems.add(new MenuItem(3L, "Grilled Chicken", "Quarter chicken with sides", 15.0, "Main Course", true));
        menuItems.add(new MenuItem(4L, "Beef Burger", "Classic beef with cheese", 12.0, "Main Course", false));
        menuItems.add(new MenuItem(5L, "Chocolate Cake", "Rich lava cake", 8.0, "Dessert", true));
        menuItems.add(new MenuItem(6L, "Fruit Salad", "Fresh seasonal fruits", 7.0, "Dessert", true));
        menuItems.add(new MenuItem(7L, "Cappuccino", "Hot coffee with foam", 4.0, "Beverage", true));
        menuItems.add(new MenuItem(8L, "Fresh Juice", "Mango or Passion fruit", 4.5, "Beverage", true));
    }

    @GetMapping
    public List<MenuItem> getAllItems() {
        return menuItems;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getItemById(@PathVariable Long id) {
        return menuItems.stream()
                .filter(item -> item.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<MenuItem> getByCategory(@PathVariable String category) {
        return menuItems.stream()
                .filter(i -> i.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    @GetMapping("/available")
    public List<MenuItem> getAvailable(@RequestParam boolean available) {
        return menuItems.stream()
                .filter(i -> i.isAvailable() == available)
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<MenuItem> searchByName(@RequestParam String name) {
        return menuItems.stream()
                .filter(i -> i.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public String addItem(@RequestBody MenuItem item) {
        menuItems.add(item);
        return "Menu item added successfully!";
    }

    @PutMapping("/{id}/availability")
    public String toggleAvailability(@PathVariable Long id) {
        for (MenuItem item : menuItems) {
            if (item.getId().equals(id)) {
                item.setAvailable(!item.isAvailable());
                return "Availability updated to: " + item.isAvailable();
            }
        }
        return "Item not found";
    }

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        boolean removed = menuItems.removeIf(i -> i.getId().equals(id));
        return removed ? "Item removed successfully" : "Item not found";
    }
}