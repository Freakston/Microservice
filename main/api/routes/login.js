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
    console.log("--------Login--------");
    console.log(req.body);
    const id = req.body.username;
    console.log(id);
    User.findOne({username:id}).exec().then(doc =>{
        if(doc === null){
            return res.status(200).json({
                message : "User does not exist"
            });
        }
        if(req.body.password !== doc.password){
            res.status(200).json({
                message : "Invalid password"
            });
        }
        else{
            res.redirect('app3');
            res.status(200).json({
                message : "Login Succesful"
            });
        }
    }).catch(err => {
        console.log("----------Error-------------");
        console.log(err);
        console.log("----------Error-------------");
    });

});
/*
router.post('/register',(req,res,next) =>{
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
*/
module.exports = router;