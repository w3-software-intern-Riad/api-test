const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicName: { type: String } // Assuming you want to store the name of the profile picture
});

const User = mongoose.model('User', userSchema);

module.exports = User;
