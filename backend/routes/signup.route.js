import express from 'express';
const router = express.Router();

import userModel from '../models/signup.model.js';
import  jwt  from 'jsonwebtoken';

const JWT_SECRET = "mySuperSecretKey";
const JWT_EXPIRES_IN = "1h";
//password check
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login attempt:", email, password);

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user by email
        const userData = await userModel.findByEmail(email, password);
        console.log("user is -->>>", userData);

        if (!userData) {
            return res.status(404).json({
                success: false,
                redirect: "/signup",
                message: "User not found, please signup",
            });
        }
        console.log("password" + password)
        console.log("user password" + userData.password);
        // Compare passwords

        console.log("password is" + password)

   
        // Generate JWT token
        const token = jwt.sign(
            {
                id: userData.id,
                name: userData.name,
                email: userData.email
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return res.status(200).json({
            success: true,
            redirect: "/",
            message: "Login successful",
            token,
           userData: { ...userData, password: undefined },
        });

    } catch (err) {
        console.error("Error in login route:", err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//sign up user
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: "all field are required" })
        }
        const newUser = { name, email, password }
        const response = await userModel.createuser(newUser)
        res.status(201).json({
            success: true,
            message: "user create successfully",
            data: response
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: "server err", err
        })

    }
})

export default router