import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

// Middleware to authenticate JWT token

router.use((req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.userId = decoded.id;
        // Default to 'user' if role is not present
        req.isAdmin = decoded.isAdmin || false;
        next();
    });
});
export default router;