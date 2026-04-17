import jwt from 'jsonwebtoken';

const JWT_SECRET = "mySuperSecretKey";

const authentication = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        console.log("authheader",authHeader)
        // 1. Token check
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token, access denied"
            });
        }

        // 2. Format: Bearer TOKEN
        const token = authHeader.split(" ")[1];
        console.log("token-->",token)
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        // 3. Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded",decoded)
        // 4. User info attach karo request me
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token is not valid"
        });
    }
};

export default authentication;