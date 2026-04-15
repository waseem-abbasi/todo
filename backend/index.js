import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5173",   // local vite
    "https://todoprectise.netlify.app"
  ],
  credentials: true
}));

import homeRoutes from './routes/task.routes.js'
import signupRoutes from './routes/signup.route.js'

app.use("/users", homeRoutes)
app.use("/signup", signupRoutes)

app.get("/", (req, res) => {
  res.send("API is running ");
});

// FOR VERCEL: Export the app directly (NO app.listen)
export default app;

// FOR LOCAL DEVELOPMENT: Keep this for testing
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 2000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}