const connection = require("./model");
const express = require("express");
const application = express();
const path = require("path");
const expressHandlebars = require("express-handlebars");
const bodyparser = require("body-parser");

const userController = require("./controllers/users");
const authController = require("./controllers/auths");
const hospitalController = require("./controllers/hospitals");
const requestController = require("./controllers/request");
const plasmaDonarController = require("./controllers/plasmaDonars");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

// setting up bodyparser
application.use(bodyparser.json())
application.use(bodyparser.urlencoded({
    extended : true
}));
application.use(cookieParser());

// setting up views and engine
application.set('views',path.join(__dirname,"/views/"))
application.engine("hbs",expressHandlebars({
    extname : "hbs",
    defaultLayout : "mainlayout",
    layoutsDir : __dirname+"/views/layouts"
}));
application.set("view engine","hbs");


application.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// routing 


application.use("/api/users",userController);
application.use("/api/auths",authController);
application.use("/api/hospitals",hospitalController);
application.use("/api/request" , requestController);
application.use("/api/plasmaDonars" , plasmaDonarController);

if (process.env.NODE_ENV === 'production') {
    application.use(express.static('client/build'));
  
    const path = require('path');
    application.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }


// setting up express server
application.set('port', process.env.PORT || 3000);

application.listen(application.get('port'),()=>{
    console.log("server started");
})