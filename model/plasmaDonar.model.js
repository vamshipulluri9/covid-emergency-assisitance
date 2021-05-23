const mongoose = require("mongoose");

var PlasmaDonarSchema = new mongoose.Schema({
    donarName : String,
    address : String,
    bloodGroup : String,
    isAvailable : Boolean,
    email : String
})

mongoose.model("PlasmaDonar",PlasmaDonarSchema);