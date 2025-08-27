const jwt  = require('jsonwebtoken');
const User = require('../models/user')
const userAuth = async (req,res,next) => {

    //token validation
    try{
    const {shivam} = req.cookies;
    if(!shivam){
        return res.status(401).send("the token is not created");
    }
    const decoded = await jwt.verify(shivam,'your_jwt_secret');
    const {userId} = decoded;
    const user = await User.findById(userId);
    if(!user){
        return res.status(401).send("Unauthorized Person");
    }
    req.user = user;
    next();
    }
    catch(err){
        return res.status(400).send("The Auth doesnt worked out here");
    }

}

module.exports = {
    userAuth
}