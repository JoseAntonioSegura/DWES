import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  name: { type: String, required: true, unique: true},
  lastname: { type: String, required: true, unique: true},
  country: { type:String, required: true},
  usernameImage: { type: String, default: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"},
  email: { type: String, required: true},
  phoneNumber: { type: Number, required: false},
  password: { type: String, required: true},
  rol: {
    type: String,
    enum: ["Admin", "User"],
    default: "User"
  }
}, { timestamps: true});

export default model('User', userSchema);
