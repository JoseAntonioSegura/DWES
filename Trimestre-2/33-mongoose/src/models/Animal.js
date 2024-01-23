import mongoose from "mongoose";

const { Schema } = mongoose;

const animalSubSchema = new Schema({
    data: Schema.Types.Mixed,
}, {_id : false});

const animalSchema = new Schema({
  name: String,
  type: {
    name: String,
  },
  color: String,
  legs: Number,
  hasTail: Boolean,
  age: Number,
  data: animalSubSchema,
}, {timestamps: true});

export default mongoose.model('Animal', animalSchema);
