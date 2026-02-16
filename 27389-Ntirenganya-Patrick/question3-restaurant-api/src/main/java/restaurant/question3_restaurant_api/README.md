# Question 3: Restaurant Menu API

## Project Description
A Spring Boot RESTful API developed for a restaurant menu management system. This API allows users to manage menu items, including adding new items, searching by category or availability, toggling item status, and performing keyword searches on item names.

## Features implemented
- **Display All Items**: Retrieve the full menu.
- **Get Specific Item**: Find a menu item by its unique ID.
- **Category Filter**: Filter items by "Appetizer", "Main Course", "Dessert", or "Beverage".
- **Availability Search**: Filter items based on whether they are currently in stock.
- **Keyword Search**: Search for items where the name contains a specific string.
- **Register Item**: Add new menu items to the system.
- **Toggle Availability**: A specialized update endpoint to flip an item's status.
- **Delete Item**: Remove items from the menu.

---

## API Endpoints

### 1. Menu Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/menu` | Retrieve all 8+ sample menu items |
| **GET** | `/api/menu/{id}` | Get details of a specific item by ID |
| **POST** | `/api/menu` | Add a new item to the menu |
| **DELETE** | `/api/menu/{id}` | Remove an item from the menu |

### 2. Searching & Filtering
| Method | Endpoint | Parameter Type | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/menu/category/{category}` | **Path Variable** | Filter by Category (e.g., /Dessert) |
| **GET** | `/api/menu/available?available=true` | **Query Param** | Filter by availability status |
| **GET** | `/api/menu/search?name=Burger` | **Query Param** | Search by name keyword |

### 3. Specialized Actions
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **PUT** | `/api/menu/{id}/availability` | Toggles `available` between true/false |

---

## Sample JSON Structure (For POST/PUT)
```json
{
    "id": 9,
    "name": "Iced Coffee",
    "description": "Cold brewed coffee with milk",
    "price": 3.5,
    "category": "Beverage",
    "available": true
}