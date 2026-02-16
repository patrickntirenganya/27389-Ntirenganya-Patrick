package ecommerce.question4_ecommerce_api.controller;
import ecommerce.question4_ecommerce_api.model.Product;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/api/products")
public class ProductController {

    private List<Product> products = new ArrayList<>();

    public ProductController() {
        //sample products
        products.add(new Product(1L, "iPhone 15", "Apple smartphone", 999.99, "Electronics", 50, "Apple"));
        products.add(new Product(2L, "Galaxy S23", "Samsung flagship", 899.99, "Electronics", 30, "Samsung"));
        products.add(new Product(3L, "MacBook Air", "Lightweight laptop", 1199.0, "Electronics", 15, "Apple"));
        products.add(new Product(4L, "Coffee Maker", "Automatic brewer", 45.5, "Home", 100, "Keurig"));
        products.add(new Product(5L, "Running Shoes", "Breathable sneakers", 120.0, "Fashion", 0, "Nike"));
        products.add(new Product(6L, "Yoga Mat", "Non-slip rubber mat", 25.0, "Sports", 40, "Lululemon"));
        products.add(new Product(7L, "Headphones", "Noise cancelling", 299.0, "Electronics", 25, "Sony"));
        products.add(new Product(8L, "Backpack", "Water resistant bag", 60.0, "Fashion", 12, "North Face"));
        products.add(new Product(9L, "Desk Lamp", "LED with USB port", 35.0, "Home", 0, "IKEA"));
        products.add(new Product(10L, "Smart Watch", "Fitness tracker", 199.0, "Electronics", 20, "Fitbit"));
    }

    
    @GetMapping
    public List<Product> getAllProducts(@RequestParam(defaultValue = "0") int page, 
                                        @RequestParam(defaultValue = "10") int limit) {
        return products.stream()
                .skip((long) page * limit)
                .limit(limit)
                .collect(Collectors.toList());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable Long productId) {
        return products.stream().filter(p -> p.getProductId().equals(productId)).findFirst()
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return products.stream().filter(p -> p.getCategory().equalsIgnoreCase(category)).collect(Collectors.toList());
    }

    @GetMapping("/brand/{brand}")
    public List<Product> getByBrand(@PathVariable String brand) {
        return products.stream().filter(p -> p.getBrand().equalsIgnoreCase(brand)).collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam String keyword) {
        String k = keyword.toLowerCase();
        return products.stream()
                .filter(p -> p.getName().toLowerCase().contains(k) || p.getDescription().toLowerCase().contains(k))
                .collect(Collectors.toList());
    }

    @GetMapping("/price-range")
    public List<Product> getByPrice(@RequestParam Double min, @RequestParam Double max) {
        return products.stream().filter(p -> p.getPrice() >= min && p.getPrice() <= max).collect(Collectors.toList());
    }

    @GetMapping("/in-stock")
    public List<Product> getInStock() {
        return products.stream().filter(p -> p.getStockQuantity() > 0).collect(Collectors.toList());
    }

    @PostMapping
    public String addProduct(@RequestBody Product product) {
        products.add(product);
        return "Product added!";
    }

    @PutMapping("/{productId}")
    public String updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getProductId().equals(productId)) {
                products.set(i, updatedProduct);
                return "Product updated!";
            }
        }
        return "Product not found";
    }

    @PatchMapping("/{productId}/stock")
    public String updateStock(@PathVariable Long productId, @RequestParam int quantity) {
        for (Product p : products) {
            if (p.getProductId().equals(productId)) {
                p.setStockQuantity(quantity);
                return "Stock updated to " + quantity;
            }
        }
        return "Product not found";
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable Long productId) {
        products.removeIf(p -> p.getProductId().equals(productId));
        return "Product deleted";
    }
}