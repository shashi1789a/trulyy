const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        minLength:5,
        trim: true,
    },
    phnumber:Number,
    email:String,
    password: String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
        
    }],
    orders:{
        type:Array,
        default:[],
    },
    contact:Number,
    picture:String,

});

module.exports =mongoose.model('user', userSchema);