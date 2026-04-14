// const express = require("express")
import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json())

app.use(cors());
// const homeRoutes = require("./routes/home.routes")
import homeRoutes from './routes/task.routes.js'
import signupRoutes from './routes/signup.route.js'

app.use("/users",homeRoutes)
app.use("/signup",signupRoutes)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})