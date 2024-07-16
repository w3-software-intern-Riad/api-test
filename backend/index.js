const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');


app.use(express.json())
require('dotenv').config()

// database connection
const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection URI
const uri = process.env.DATABASE_URL;

mongoose.connect(uri, {


});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB Atlas');
});

// importing model

const User = require('./models/userSchema')

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
  }
});

// Initialize upload variable with storage engine
const upload = multer({ storage: storage });


//signup

app.post('/signup', upload.single('picture'), async (req, res) => {
  const { username, age, email, password } = req.body;
  const picture = req.file ? req.file.filename : null;
  console.log(picture)

  try {
    const user = await User.create({
      username: username,
      age: age,
      email: email,
      password: password,
      profilePicName: picture
    })
    return res.status(200).json({ message: "user is created successfully", data: user })
  } catch (error) {
    console.log(error);
  }

});



// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user && (user.password === password)) {

      return res.status(200).json({ message: "user is successfully login", data: user })
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Update user route
app.put('/update/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, age } = req.body;
  

  try {
    const result = await User.findByIdAndUpdate(userId, {
      username: username,
      age: age
    }, { new: true });
    return res.status(201).json({message:"Data is updated successfully",newData:result});
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// delete user

app.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(400).json({ error: 'Failed to delete user' });
  }
});



const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});