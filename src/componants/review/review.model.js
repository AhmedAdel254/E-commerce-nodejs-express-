
const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    title:{
        type: String,
        required: [true,'Review title is required'],
        trim: true,
        minlength: [1, 'Review title must be at least 3 characters long']

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
    },
    product:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        
    },
    rating: {
        type: Number,
        min :[1.0, 'Rating must be above 1.0'],
        max: [5.0, 'Rating must be below 5.0'],
    },

},{timestamps: true});

Schema.pre(/^find/, function() {
    this.populate("user","name -_id");
    
})


module.exports = mongoose.model('review', Schema);