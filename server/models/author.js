const mongoose = require('mongoose');

const { Schema } = mongoose;

let authorSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model('Author', authorSchema);
