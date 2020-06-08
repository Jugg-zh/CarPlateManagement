const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  plateList : String,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
