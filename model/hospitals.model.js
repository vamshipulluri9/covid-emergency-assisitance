const mongoose = require("mongoose");

var HospitalSchema = new mongoose.Schema({
    hospitalName : String,
    address : String,
    email : String,
    beds:{
        ICUbeds : Number,
        otherbeds: Number
    },
    blood :{
         "A+" : Number,
         "B+" : Number,
         "O+" : Number,
         "AB+" : Number,
         "A-" : Number,
         "B-" : Number,
         "O-" : Number,
         "AB-" : Number

    },
    oxygen:{
        kits : Number,
        stock: Number
    }
})

mongoose.model("Hospital",HospitalSchema);