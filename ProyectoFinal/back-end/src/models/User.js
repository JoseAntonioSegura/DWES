
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true}
}, { timestamps: true});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function(newPassword) {
  return bcrypt.compare(newPassword, this.password);
};


export default model('User', userSchema);
