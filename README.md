# Java Servlet Assignments - Student ID: 27389

This repository contains the completed Java Servlet assignments for **Web Technology**. The project demonstrates the use of Java Servlets for server-side logic, form handling, and external redirects, combined with a modern, animated user interface.

## 🚀 Project Overview

The application features a single-page animated interface that hosts two distinct functional forms:
1.  **Login Validation:** Uses `POST` to verify password strength.
2.  **Search Redirect:** Uses `GET` to perform external search redirects.

---

## 🛠 Features & Implementation

### 1. Animated UI (index.html)
* **Single-Page Design:** Both the Login and Redirect forms are contained within the same `index.html` file to provide a seamless user experience.
* **Interactive Navigation:** Users can switch between the Login form and the Redirect form by clicking the **"Go Ahead"** or **"Back"** links. This triggers a smooth CSS-based sliding animation.
* **Styling:** A dark-themed, responsive design built with Poppins fonts and Boxicons.

### 2. Login Logic (LoginServlet.java)
* **Assignment Requirement:** Validates user credentials and checks password length.
* **Technical Detail:** * Listens for `POST` requests at the `/LoginServlet` endpoint.
    * If the password length is **less than 8 characters**, it returns a "Weak Password" warning.
    * If the password is **8+ characters**, it returns a "Success" message.
    * The response is dynamically styled in the Servlet's `PrintWriter` output to match the main UI.

### 3. External Redirect (RedirectServlet.java)
* **Assignment Requirement:** Redirects the user to an external site using a search parameter.
* **Technical Detail:** * Listens for `GET` requests at the `/RedirectServlet` endpoint.
    * It captures the search query parameter from the form input.
    * Uses the `response.sendRedirect()` method to send the user directly to a Google Search results page based on their input.

---

## 📁 Project Structure

```text
├── src
│   └── main
│       ├── java
│       │   ├── LoginServlet.java     # Handles authentication logic
│       │   └── RedirectServlet.java  # Handles Google Search redirect
│       └── webapp
│           ├── index.html            # Main UI with animated forms
│           └── WEB-INF
│               └── web.xml           # Servlet configurations
├── pom.xml                           # Project dependencies (Java 21, Servlet API)
└── README.md                         # Documentation