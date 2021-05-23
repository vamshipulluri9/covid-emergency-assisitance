const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const AuthModel = mongoose.model("Auth");
const UserModel = mongoose.model("User");

const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const withAuth = require("./middleware");


router.post('/signUp', function(req, res) {
    //const { email, password } = req.body;
    const User = new UserModel();
    User.firstName = req.body.firstName;
    User.lastName = req.body.lastName;
    User.role = req.body.role;
    User.email = req.body.email;
    User.address = req.body.address;
    User.role===2 && (User.hospitalName = req.body.hospitalName);
    User.save((err)=>{
      if(err){
        res.status(500).send("Registration failed");
      }
      else{
        const Auth = new AuthModel();
        Auth.email = req.body.email;
        Auth.password = req.body.password;
        Auth.save(function(err) {
          if (err) {
            res.status(500)
              .send("Auth addition failed");
          } else {
            var email = Auth.email;
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
          }
        });
      }
    })


  });


  router.post('/signIn', function(req, res) {
    console.log(req.body);
  const { email, password } = req.body;
  AuthModel.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          
          UserModel.findOne({email : email} , (err,user)=>{
            if (err) {
              res.status(500)
                .json({
                  error: 'Internal error please try again'
              });
            } else if (!user) {
              res.status(401)
                .json({
                  error: 'Incorrect email or password'
              });
            } else {
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
              });
              res.cookie('token', token, { httpOnly: true })
                .status(200).json(user);

            }
          })
          // Issue token
         
        }
      });
    }
  });
});

router.get('/logout',(req,res)=>{
  try {
    res.clearCookie("token").status(200).send();
    console.log("logged out");
  }
  catch(error){
    res.status(500).send(error);
  }
})

router.post('/isAuthorised', withAuth, function(req, res) {
  UserModel.findOne({email : req.email},(err,user)=>{
    if (err) {
      res.status(500)
        .json({
          error: 'Internal error please try again'
      });
    } else if (!user) {
      console.log(user);
      res.status(401)
        .json({
          error: 'Incorrect email or password'
      });
    } else {
      res.status(200).json(user);
    }
  })
});


  module.exports = router;