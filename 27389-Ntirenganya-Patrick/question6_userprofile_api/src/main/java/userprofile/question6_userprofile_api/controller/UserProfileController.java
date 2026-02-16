package userprofile.question6_userprofile_api.controller;



import userprofile.question6_userprofile_api.model.UserProfile;
import userprofile.question6_userprofile_api.DTO.ApiResponse;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private List<UserProfile> users = new ArrayList<>();

    public UserProfileController() {
        users.add(new UserProfile(1L, "john_doe", "john@test.com", "John Doe", 25, "USA", "Dev", true));
        users.add(new UserProfile(2L, "jane_smith", "jane@test.com", "Jane Smith", 30, "UK", "Designer", true));
    }

    @GetMapping
    public ApiResponse<List<UserProfile>> getAll() {
        return new ApiResponse<>(true, "Users retrieved successfully", users);
    }

    @PostMapping
    public ApiResponse<UserProfile> createUser(@RequestBody UserProfile profile) {
        users.add(profile);
        return new ApiResponse<>(true, "User profile created successfully", profile);
    }

    @GetMapping("/search")
    public ApiResponse<List<UserProfile>> search(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge) {

        List<UserProfile> filtered = users.stream()
            .filter(u -> (country == null || u.getCountry().equalsIgnoreCase(country)))
            .filter(u -> (minAge == null || u.getAge() >= minAge))
            .filter(u -> (maxAge == null || u.getAge() <= maxAge))
            .collect(Collectors.toList());

        return new ApiResponse<>(true, "Search results returned", filtered);
    }

    @PatchMapping("/{userId}/status")
    public ApiResponse<UserProfile> toggleStatus(@PathVariable Long userId, @RequestParam boolean active) {
        for (UserProfile u : users) {
            if (u.getUserId().equals(userId)) {
                u.setActive(active);
                String status = active ? "activated" : "deactivated";
                return new ApiResponse<>(true, "User profile " + status, u);
            }
        }
        return new ApiResponse<>(false, "User not found", null);
    }
}
