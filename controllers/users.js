const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const UserModel = mongoose.model("User");
const withAuth = require("./middleware");

router.get("/list",withAuth,(req,res)=>{

    UserModel.find((err,docs)=>{
        if(!err){
            res.send(docs);
            //console.log(docs);
        }
        else {
            res.send("Error!!")
        }
    })
})

router.get("/me",withAuth,(req,res)=>{
    UserModel.findOne({email: req.email},(err,user)=>{
        if(err){
            res.status(500).send("Internal server error");
        }
        else if(!user){
            res.status(401).send("Could not find user");
        }
        else{
            res.json(user).status(200);
        }
    })
})



module.exports = router;