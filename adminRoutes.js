// adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Membership = require('../models/Membership');

// Route to fetch all users
router.get('/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();
        res.json(users);  // Return users as JSON response
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Route to add a new membership
router.post('/add-membership', async (req, res) => {
    try {
        const { userId, membershipType, startDate, endDate } = req.body;

        // Validate input
        if (!userId || !membershipType || !startDate || !endDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new membership
        const newMembership = new Membership({
            userId,
            membershipType,
            startDate,
            endDate
        });

        // Save membership to the database
        await newMembership.save();

        // Update user document with the new membership
        const user = await User.findById(userId);
        user.memberships.push(newMembership._id);  // Assuming 'memberships' field exists in User model
        await user.save();

        res.json({ message: 'Membership added successfully', membership: newMembership });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add membership' });
    }
});

// Route to delete a user (admin functionality)
router.delete('/delete-user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete the user from the database
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
