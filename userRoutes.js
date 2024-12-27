// userRoutes.js
router.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('cart');  // Assuming cart is an array of Item IDs
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

// userRoutes.js
router.post('/add-guest/:userId', async (req, res) => {
    const { userId } = req.params;
    const { guestName } = req.body;

    try {
        const user = await User.findById(userId);
        user.guestList.push(guestName);
        await user.save();
        res.json({ message: 'Guest added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add guest' });
    }
});

