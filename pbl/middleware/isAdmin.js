import client from '../prisma/db.js';

export const isAdmin = async (req, res, next) => {
    try {
        const admin = await client.admin.findUnique({
            where: { id: req.userId },
        });

        if (!admin) {
            return res.status(403).json({ message: 'Access denied: admin only' });
        }

        next();
    } catch (error) {
        console.error('isAdmin check error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};