
const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name:{
        type: String,
        required: [true,'subCategory name is required'],
        unique: [true,'subCategory name must be unique'],
        trim: true,
        minlength: [3, 'subCategory name must be at least 3 characters long'],
    } ,
    slug: {
        type: String,
        lowercase: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',

    }
},{timestamps: true,});

module.exports = mongoose.model('subCategory', Schema);