import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import teamRoutes from "./routes/team.routes.js";
import commentRoutes from "./routes/comment.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 TaskTracker Productivity API</h1>
    <p>This is the backend API for the TaskTracker Productivity app.</p>
    <p>Try accessing the API endpoints like <code>/users</code>, <code>/tasks</code>, etc.</p>
    <p>Built with ❤️ using Express.js and MongoDB</p>
  `);
});


// Routes
app.use("/api/users", userRoutes);


// task routes 
app.use("/api/tasks", taskRoutes);


// team creatu=ion 
app.use("/api/teams", teamRoutes);



// add comment 
app.use("/api/comments", commentRoutes);

connectDB()
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})