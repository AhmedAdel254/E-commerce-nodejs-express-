
const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name:{
        type: String,
        required: [true,'brands name is required'],
        unique: [true,'brands name must be unique'],
        trim: true,
        minlength: [3, 'brands name must be at least 3 characters long'],
    } ,
    slug: {
        type: String,
        lowercase: true,
    },
    image:String
},{timestamps: true,});
// Schema.post('init', (doc)=>{
//     doc.image = "http://localhost:3000/brands/" + doc.image
// })

module.exports = mongoose.model('brands', Schema);