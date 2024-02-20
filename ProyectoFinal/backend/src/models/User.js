
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  usernameImage: { type: String, default: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"},
  email: { type: String, required: true},
  phoneNumber: { type: Number, sparse: true},
  password: { type: String, required: true}
}, { timestamps: true});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function(newPassword) {
  return bcrypt.compare(newPassword, this.password);
};


export default model('User', userSchema);
