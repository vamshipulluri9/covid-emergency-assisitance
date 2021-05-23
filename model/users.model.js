const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    role :{
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address :  String,
    hospitalName : String,
});

mongoose.model("User",UserSchema);