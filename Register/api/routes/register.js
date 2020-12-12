const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

var Schema = mongoose.Schema;

var UserStructSchema = new Schema({
    _id : mongoose.Types.ObjectId,
    username: String,
    password: String
});

var User = mongoose.model('UserStruct', UserStructSchema );

router.post('/',(req,res,next) =>{
    console.log("--------Register--------");
    console.log(req.body);
    const user = new User({
        _id : new mongoose.Types.ObjectId(),
        username : req.body.username,
        password : req.body.password
    });
    User.findOne({username:req.body.username}).exec().then(doc => {
        if(doc === null){
            user.save().then(result =>{
                console.log(result);
            });
            res.status(201).json({
                message : "Regestired",
                user: user
            });
        }else{
            res.status(200).json({
                message : "Failed to register ! User already exists",
                user: user
            });
        }
    });
});
module.exports = router;