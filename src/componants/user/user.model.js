
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema({
    name:{
        type: String,
        required: [true,'User name is required'],
        trim: true,
        minlength: [3, 'User name must be at least 3 characters long'],
    },
    email:{
        type: String,
        required: [true,'User email is required'],
        unique: [true,'User email must be unique'],
        trim: true,
    },
    phone:{
        type: String,
        required: [true,'User phone is required'],
    },
    password:{
        type: String,
        required: [true,'User password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    changePasswordAt:Date,
    profileImage:{
        type: String,
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }, 
    isActive: {
        type: Boolean,
        default: true,
    },
    verified:{
        type: Boolean,
        default: true,
    },
    wishList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }],
    addresses:[{
        name: String,
        phone: String,
        address: String,
        city: String, 
    }]
  
},{timestamps: true,});

Schema.pre('save',async function (next){
    this.password = await bcrypt.hash(this.password, parseInt(process.env.rounds));
})

Schema.pre('findOneAndUpdate', async function (next) {
    if(!this._update.password) return

    this._update.password = await bcrypt.hash(this._update.password, parseInt(process.env.rounds));
})

module.exports = mongoose.model('user', Schema);