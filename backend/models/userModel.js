const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

// Create the model class
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signupUser = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error(`Email ${email} is already in use`);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login function
userSchema.statics.loginUser = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error(`Email ${email} is incorrect`);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error(`Password is incorrect`);
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
