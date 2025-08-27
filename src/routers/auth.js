const express = require('express');
const authRouter  = express.Router();
const {loginValidation} = require('../utils/validation')
const validation = require('validator');
const User = require('../models/user')
const bcrypt = require('bcrypt')

authRouter.post("/signup", async (req, res) => {    
  try {
    loginValidation(req);
    const { firstName, lastName, emailId, password} = req.body;
    //encrypt the password
    const passhash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passhash,});
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("shivam", token);
    res.send(savedUser);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


authRouter.post("/login", async (req, res) => {    
  try {
    const { emailId,password} = req.body;
    if(validation.isEmail(emailId) === false){
      throw new Error("Email is not valid");
    }
    //encrypt the password
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.status(400).send("User not found");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("shivam", token);
      res.send(user);
    }
    else {
      res.status(400).send("Invalid password");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {    
  try {
   res.cookie("shivam",null,{expiresIn:new Date(Date.now())});
   res.send("LOgout sucessfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


module.exports = authRouter;