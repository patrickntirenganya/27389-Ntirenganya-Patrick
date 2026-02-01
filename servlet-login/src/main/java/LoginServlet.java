import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String user = request.getParameter("username");
        String pass = request.getParameter("password");
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<head>");
        out.println("<style>");
        out.println("@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');");
        out.println("body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#111; font-family:'Poppins', sans-serif; }");
        out.println(".result-container { " +
                    "position:relative; width:500px; padding:50px; text-align:center; " +
                    "background: linear-gradient(135deg, #1a1a1a 50%, #b33927 50%); " + 
                    "border-radius:15px; border: 2px solid #ff5e57; " + 
                    "box-shadow: 0 0 25px rgba(255, 94, 87, 0.4); color:white; }");
        out.println(".bold-text { color:#ff5e57; font-weight:600; }");
        out.println(".btn { display:inline-block; margin-top:20px; padding:10px 30px; " +
                    "background:#1a1a1a; border:2px solid #ff5e57; color:white; " +
                    "text-decoration:none; border-radius:40px; font-weight:600; transition:0.3s; }");
        out.println(".btn:hover { background:#ff5e57; box-shadow: 0 0 10px #ff5e57; }");
        out.println("</style>");
        out.println("</head>");
        
        out.println("<body>");
        out.println("<div class='result-container'>");
        
        if (pass.length() < 8) {
            out.println("<h1 style='color:#ff5e57; margin-bottom:15px;'>Weak Password!</h1>");
            out.println("<p style='font-size:18px;'>Hello <span class='bold-text'>" + user + "</span>, your password is too short.</p>");
            out.println("<p>Please try a stronger one.</p>");
        } else {
            out.println("<h1 style='color:#ff5e57; margin-bottom:15px;'>Success!</h1>");
            out.println("<p style='font-size:18px;'>Welcome back, <span class='bold-text'>" + user + "</span>!</p>");
            out.println("<p>Login successfully validated.</p>");
        }
        
        out.println("<a href='index.html' class='btn'>Go Back</a>");
        out.println("</div>");
        out.println("</body></html>");
    }
}