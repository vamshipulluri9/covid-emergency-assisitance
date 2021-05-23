const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const withAuth = require("./middleware");

const HospitalModel = mongoose.model("Hospital");
const UserModel = mongoose.model("User");
const PlasmaDonarModel = mongoose.model("PlasmaDonar");
const sendEmailTo = require('./email') 

router.post("/hospitals",withAuth,(req,res)=>{
    const main = req.body["main"];
    const supp = req.body.supp;
    const num = req.body.requirement
    var list = [];
    console.log(`hospitalName ${main}.${supp} _id num`);
    HospitalModel.find({ [`${main}.${supp}`] : { $gte: num } },`hospitalName ${main}.${supp} address _id`, {limit : 20},(err,docs)=>{
        //console.log(`docs = ${docs}`);
       if(err)res.status(500).send("Internal Server Error");
       else if(!docs)res.status(401).send("No hospitals found");
       else{
           res.status(200).json(docs);
       }
   })//.projection({hospitalName :1 , "beds.ICUbeds" : 1 });
   
})


router.post("/plasmaDonars", withAuth , (req,res)=>{

    PlasmaDonarModel.find({bloodGroup : req.body.bloodGroup , isAvailable : true } , 'donarName email address _id' , {limit : 20} , (err,docs)=>{
        if(err)res.status(500).send("Internal Server Error");
       else if(!docs)res.status(401).send("No Donors found");
       else{
           res.status(200).json(docs);
       }
    })
})

router.post("/hospitals/book" , withAuth , (req,res)=>{
    const main = req.body["main"];
    const supp = req.body.supp;
    const requirement = req.body.requirement;

    const email = req.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const hospitalId = req.body._id;

    HospitalModel.findByIdAndUpdate(hospitalId,{ $inc : { [`${main}.${supp}`] : -1 *requirement  } },{new : true} , (err,doc)=>{
        
        if(err)res.status(500).send("Internal server error"); 
        else if (!doc) res.status(401).send("Doc not found");
        else {
            const hospitalEmail = doc.email;
            sendEmailTo(hospitalEmail,"Request for resources",`The is an emergency request for ${main} - ${supp}  : ${requirement} units 
            \n By ${email} \n Please arrange it as soon as possible.\n Thank You ! `);
            res.status(200).json(doc);
        }
    })
})

router.post("/plasmaDonars/book" , withAuth , (req,res)=>{
    const requirement = req.body.requirement;

    const email = req.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const donarId = req.body._id;

    PlasmaDonarModel.findByIdAndUpdate(donarId,{ $set : {isAvailable : false} },{new : true} , (err,doc)=>{
        if(err)res.status(500).send("Internal server error"); 
        else if (!doc) res.status(401).send("Doc not found");
        else {
            const donarEmail = doc.email;
            sendEmailTo(donarEmail,"Request for Plasma",`Dear ${doc.name} , The is an emergency request for plasma Donation. 
            \n By ${email} \n Please arrange it as soon as possible.\n Thank You !`);
            res.status(200).json(doc);
        }
    })
})

router.get("/profile/me" , withAuth , (req,res)=>{
    const email = req.email;
    UserModel.findOne({email: email},(err,user)=>{
            if(err){
                res.status(500).send("Internal server error");
            }
            else if(!user){
                res.status(401).send("Could not find user");
            }
            else{
                const role = user.role;
                if(role===1)res.json([user]).status(200);

                else if(role ===2){
                    hospitalName = user.hospitalName;
                    HospitalModel.findOne({hospitalName:hospitalName},(err1,hospital)=>{
                        if(err1)res.status(500).send("Internal Server error");
                        else if(!hospital)res.status(401).send("hospital details not updated");
                        else{
                            res.status(200).json([user,hospital]);
                        }
                    })
                }

                else if(role ===3 ){
                    donarName = `${user.firstName} ${user.lastName}`;
                    PlasmaDonarModel.findOne({donarName:donarName},(err1,donar)=>{
                        if(err1)res.status(500).send("Internal Server error");
                        else if(!donar)res.status(401).send("donar details not updated");
                        else{
                            res.status(200).json([user,donar]);
                        }
                    })
                }
            }
        })
    
})



module.exports = router;