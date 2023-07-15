import mongoose from 'mongoose';
const { Schema } = mongoose;

const notesUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports=mongoose.model("User",notesUserSchema);