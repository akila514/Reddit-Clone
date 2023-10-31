import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  profilePic: { type: String },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: { type: Array, required: true },
  communities: { type: Array, required: true },
});

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
