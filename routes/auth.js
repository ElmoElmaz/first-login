const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

router.post('/register', async (req, res) => {
 try{
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password:hashedPassword});
    await user.save();
    res.status(200).json({ message: 'User registered successfully'})
 } catch (error){
    re.status(500).json({error: error.message})
 }
});

router.post('/login', async (req, res) => {
try{
    const { username, password } = req.body
    const user = await User.findOne({username});
    //(!user) = user == undefined - isto znacenje 
    if(!user){
        return res.status(400).json({message: 'User not found!'})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({message: 'Invalid Password'});
    }
    const token = jwt.sign({userId: user._id}, 'your_secret_key' ,{expiresIn: '1h'});
    console.log({token});
    const decodedToken = jwt.decode(token, {complete:true});
    res.status(200).json({decodedToken})
}catch (error){
    re.status(500).json({error: error.message})
}


})


module.exports = router;