// USER MODEL
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        // Basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ['faculty','student','mentor','admin'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: ['Student', 'Mentor', 'Faculty'], 
    required: true,
  },
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Define a method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
