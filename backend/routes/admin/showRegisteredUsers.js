// show all registered users
import express from 'express';
import prisma from '../../prisma/prismaClient.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

// Get all registered users
router.get('/', auth, async (req, res) => {
    // Check if the user is an admin
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
            },
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching registered users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;