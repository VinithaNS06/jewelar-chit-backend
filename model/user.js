const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const UserSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }

    },
    password:{
        type:String,
        required:false,
        trim:true,
        minlength: 7,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Please enter your password!')
            }else if(validator.equals(value.toLowerCase(),"password")){
                throw new Error('Password is invalid!')
            }else if(validator.contains(value.toLowerCase(), "password")){
                throw new Error('Password should not contain password!')
            }
        }
    },



    firstname:{type: String,default:""},
    lastname:{type: String,default:""},
    streetno:{type: String,default:""},
    streetname:{type: String,default:""},
    city:{type: String,default:""},
    pincode:{type: Number,default:0},
    addresstype:{type: String,default:"Home"},
    profileimg:{type: String,default:""},
    

    tokens:[{
        token:{
            type:String,
            required: true
        }
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('m8it_users', UserSchema);
module.exports = User;