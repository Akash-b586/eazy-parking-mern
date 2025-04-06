import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, mobileNumber } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                mobileNumber,
            },
        });

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

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
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        const { password: _, ...userWithoutPassword } = user;

        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Frogot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email required' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Send email with reset link (pseudo code)
        // const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user.id}`;

        res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset Password Route
// router.post('/reset-password', async (req, res) => {
//     const { userId, newPassword } = req.body;

//     if (!userId || !newPassword) {
//         return res.status(400).json({ message: 'User ID and new password required' });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         await prisma.user.update({
//             where: { id: userId },
//             data: { password: hashedPassword },
//         });

//         res.json({ message: 'Password updated successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

export default router;
