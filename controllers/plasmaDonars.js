const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const PlasmaDonarModel = mongoose.model("PlasmaDonar");
const UserModel = mongoose.model("User");

const withAuth = require("./middleware");

router.get("/me" , withAuth ,(req,res)=>{
    const email = req.email;
    var donarName ;
    UserModel.findOne({email : email}, (err,user)=>{
        if(err){
            res.status(500).send("Internal Server error");
        }
        else if(!user){
            res.status(401).send("User not found!");
        }
        else {
            donarName = `${user.firstName} ${user.lastName}`;
            PlasmaDonarModel.findOne({donarName:donarName},(err1,donar)=>{
                if(err1)res.status(500).send("Internal Server error");
                else if(!donar)res.status(401).send("donar details not updated");
                else{
                    console.log(donar);
                    res.status(200).send(donar);
                }
            })
        }
    })

})

router.post('/update',withAuth,(req,res)=>{

    const email = req.email;
    var donarName ;
    var address;
    UserModel.findOne({email : email}, (err,user)=>{
        if(err){
            res.status(500).send("Internal Server error");
        }
        else if(!user){
            res.status(401).send("User not found!");
        }
        else {
            donarName = `${user.firstName} ${user.lastName}`;
            address = user.address;

            PlasmaDonarModel.findOne({donarName:donarName}, (err, doc) => {
                if (err) {
                  return res.status(500).json({error: err});
                }
                if (!doc){
                  doc = new PlasmaDonarModel();
                }
        
                Object.assign(doc , {
                    "address" :address,
                    "donarName" : donarName,
                    "email" : email,
                    "bloodGroup" : req.body.bloodGroup,
                    "isAvailable" : req.body.isAvailable
                });
        
                doc.save((err) => {
                  if (err) {
                    return res.status(500).json({error: err});
                  }
        
                  res.status(200).json(doc);
                });
              });

        }
    })
})

module.exports = router;