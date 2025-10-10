
const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name:{
        type: String,
        required: [true,'Category name is required'],
        unique: [true,'Category name must be unique'],
        trim: true,
        minlength: [3, 'Category name must be at least 3 characters long'],
    } ,
    slug: {
        type: String,
        lowercase: true,
    },
    image:String
},{timestamps: true,});
// Schema.post('init', (doc)=>{
//     doc.image = "http://localhost:3000/category/" + doc.image
// })

module.exports = mongoose.model('category', Schema);