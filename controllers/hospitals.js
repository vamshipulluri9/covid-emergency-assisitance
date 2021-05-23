const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const HospitalModel = mongoose.model("Hospital");
const UserModel = mongoose.model("User");

const withAuth = require("./middleware");

router.get("/me" , withAuth ,(req,res)=>{
    const email = req.email;
    var hospitalName ;
    UserModel.findOne({email : email}, (err,user)=>{
        if(err){
            res.status(500).send("Internal Server error");
        }
        else if(!user){
            res.status(401).send("User not found!");
        }
        else {
            hospitalName = user.hospitalName;
            HospitalModel.findOne({hospitalName:hospitalName},(err1,hospital)=>{
                if(err1)res.status(500).send("Internal Server error");
                else if(!hospital)res.status(401).send("hospital details not updated");
                else{
                    console.log(hospital);
                    res.status(200).send(hospital);
                }
            })
        }
    })

})

router.post('/update',withAuth,(req,res)=>{

    const email = req.email;
    var hospitalName ;
    var address;
    UserModel.findOne({email : email}, (err,user)=>{
        if(err){
            res.status(500).send("Internal Server error");
        }
        else if(!user){
            res.status(401).send("User not found!");
        }
        else {
            hospitalName = user.hospitalName;
            address = user.address;
            
            var update ;
            if(req.body.resource===1)update="beds";
            else if(req.body.resource===2)update="oxygen";
            else if(req.body.resource===3)update="blood";
            console.log(update);
            var updatelist = req.body[update];

            HospitalModel.findOne({hospitalName:hospitalName}, (err, doc) => {
                if (err) {
                  return res.status(500).json({error: err});
                }
                if (!doc){
                  //return res.status(404).json({error: 'Document not found'});
                  doc = new HospitalModel();
                  doc.hospitalName = hospitalName;     
                }
        
            
                Object.assign(doc[update] , updatelist );
                Object.assign(doc , {"address" :address , email : email});
        
                doc.save((err) => {
                  if (err) {
                    return res.status(500).json({error: err});
                  }
        
                  res.status(200).json(doc);
                });
              });

            /*HospitalModel.findOneAndUpdate({hospitalName:hospitalName}, { [update] : updatelist },{upsert:true, new:true},(err,hospital)=>{
                if(err)res.status(500).send("Internal server error");
                else{
                    res.status(200).json(hospital);
                }
            })*/
        }
    })
})

module.exports = router;