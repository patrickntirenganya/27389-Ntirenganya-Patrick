import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/RedirectServlet")
public class RedirectServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Get the search query from the form
        String query = request.getParameter("query");

        // Use sendRedirect to go to Google search
        // Assignment Requirement: Redirect user to Google using input value appropriately
        response.sendRedirect("https://www.google.com/search?q=" + query);
    }
}