const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true, // Convert email to lowercase
  },
  mobileNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['User', 'Admin'], 
  },
});

// Hash the password 
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next(); 
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// // Compare provided password with the hashed password
// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
