// vendorRoutes.js
router.post('/add-item', async (req, res) => {
    const { name, price } = req.body;
    const newItem = new Item({ name, price });

    try {
        await newItem.save();
        res.json({ message: 'Item added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add item' });
    }
});
