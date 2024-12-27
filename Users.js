const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    memberships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Membership' }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    guestList: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
