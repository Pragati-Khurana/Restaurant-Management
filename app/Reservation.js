const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservSchema = new Schema({
    
    Name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    To:{
        type: Number,
        required: true
    },
    From:{
        type: Number,
        required: true
    },
    Date1: {
        type: Date,
        required: true
    },
    Message:{
        type:String,
        required:true
    },
    Table: {
        type: Number,
        required: true
    },
    
});

module.exports = Reserv = mongoose.model('Reserv',ReservSchema); 