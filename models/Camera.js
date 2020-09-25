const mongoose = require('mongoose');

const cameraSchema = mongoose.Schema({ // création d'une class cameraSchema
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  lenses: { type: [String], required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Camera', cameraSchema);