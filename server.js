const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import the admin routes (assuming you've already defined the routes correctly)
const adminRoutes = require('./routes/adminRoutes');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/event-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // "admin", "vendor", or "user"
});

const User = mongoose.model("User", UserSchema); // Declare the User model here

// Use the admin routes
app.use('/admin', adminRoutes);  // Prefix all admin routes with '/admin'

// Define the login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      // Return success and the user's role
      res.json({ success: true, role: user.role });
    } else {
      // If no user is found, return failure
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
