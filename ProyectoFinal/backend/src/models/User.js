import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  name: { type: String, required: true, maxlength: 50 }, 
  lastname: { type: String, required: true, maxlength: 50 },
  country: { type: String, required: true, maxlength: 50 },
  usernameImage: { type: String, default: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg", maxlength: 200 }, // Limitar a 200 caracteres
  email: { type: String, required: true, maxlength: 80 }, 
  phoneNumber: { type: Number, required: false, maxlength: 9},
  password: { type: String, required: true},
  rol: {
    type: String,
    enum: ["Admin", "User"],
    default: "User"
  }
}, { timestamps: true});

export default model('User', userSchema);
