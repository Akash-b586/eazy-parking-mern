import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/client.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { adminName, mobileNumber, email, password } = req.body;

    if (!adminName || !email || !password || !mobileNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await prisma.admin.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.admin.create({
            data: {
                adminName,
                mobileNumber,
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ id: newUser.id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Hide sensitive fields in response
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({ message: 'User created successfully', token, user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await prisma.admin.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        const { password: _, ...userWithoutPassword } = user;

        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
