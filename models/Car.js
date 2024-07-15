const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  tanggal_keluar: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Car', carSchema);
