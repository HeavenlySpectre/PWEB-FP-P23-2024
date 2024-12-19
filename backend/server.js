const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' }
});

const User = mongoose.model('User ', userSchema);

// Register route (for creating users)
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  const newUser  = new User({ username, password: hashedPassword, role });
  
  try {
    await newUser .save();
    res.status(201).json({ message: 'User  created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password }); // Log the login attempt
    const user = await User.findOne({ username });
  
    if (user) {
      console.log('User  found:', user); // Log the found user
      const match = await bcrypt.compare(password, user.password); // Compare hashed password
      if (match) {
        res.status(200).json({ message: 'Login successful', role: user.role });
      } else {
        console.log('Password mismatch'); // Log password mismatch
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      console.log('User  not found'); // Log user not found
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});