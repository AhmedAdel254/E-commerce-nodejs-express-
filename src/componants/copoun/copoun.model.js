
const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    code:{
        type:String,
        required: [true,'Copoun code is required'],
        trim: true,
        unique: true,
    },
    expires:{
        type: Date,
        
    },
    discount:{
        type: Number,
    }

},{timestamps: true});

module.exports = mongoose.model('copoun', Schema);