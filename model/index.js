const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Pranay:Table2*2=4@cluster0.zmlnk.mongodb.net/Covid-Emergency-Assistance?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology : true},(error)=>{
    if(!error){
        console.log("Success connecting to mongodb");

    }
    else {
        console.log("error connecting to db");
    }
})

const User = require("./users.model");
const Auth = require("./auths.model");
const Hospital = require("./hospitals.model");
const PlasmaDonar = require("./plasmaDonar.model");

