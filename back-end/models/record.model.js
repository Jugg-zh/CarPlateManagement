const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    plateNumber : {type:String, required:true},
    roomNumber : {type:String},
    slotNumber : {type:String, required:true},
    timeStamp: {type:Date, required:true},
    shift:{type:String,require:true},
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;