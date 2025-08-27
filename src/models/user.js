const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        lowercase:true,
        trim:true,
        minLength:4,
    },
    lastName: {
        type: String, 
        required:true,
        lowercase:true,
        trim:true,
    },
    photoUrl:{
        type:String,
        default: "https://media.licdn.com/dms/image/v2/D5635AQEhA1Dv12JOOg/profile-framedphoto-shrink_400_400/B56ZgJNQogGUAc-/0/1752501128078?e=1756346400&v=beta&t=XtgyxIdMA2fUpsvISX3TQKnlfDZBPMKp-Ttcaz67Eo4"
    },
    emailId: {
        type: String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
    },
    password: {
        type: String,
        required:true,
    },
    age: {
        type: Number,
        default: 18,
        min:18,
    },
    gender: {
        type: String,
        required:true,
        default: "others",
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("The gender is not recoginised")
            }
        }
    },
    talent: {
        type:String,
        default: "The value we gave is default",
    },

},{
    timestamps:true,
});
userSchema.methods.getJWT = async function() {
    const user = this;
   const token =  jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
   return token;
}

userSchema.methods.validatePassword = async function(passwordByUser) {
    const user = this;
    const passwordHash = user.password;
   const isPasswordValid =  bcrypt.compare(passwordByUser, passwordHash);
   return isPasswordValid;
}

const User = mongoose.model("User",userSchema);
module.exports = User;