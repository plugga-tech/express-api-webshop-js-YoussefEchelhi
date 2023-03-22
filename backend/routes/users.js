var express = require('express');
var router = express.Router();
const fs = require("fs");
const crypto = require("crypto-js");
const { ObjectId } = require("mongodb");

/* GET users listing. */


router.get('/', function(req, res, next) {
  
  req.app.locals.db.collection("users").find({}, {projection: { password: 0 }}).toArray()
  .then(result => {
    console.log("result from GET users", result);
    res.json(result)
  })
}); 


router.get('/:userId', function(req, res, next) {
  userId = req.params.userId;
  console.log(userId);

  req.app.locals.db.collection("users").findOne({"_id": new ObjectId(userId) })
  .then(result => {
    console.log("Hitta user", result);
    res.json(result)
  })
});

router.post('/add', function(req, res, next) {

  let newUser = { name: req.body.name };
  let userMail = req.body.email;
  let passwordToSave = crypto.SHA3(req.body.password).toString();

  newUser.password = passwordToSave;
  newUser.email = userMail;
 
  req.app.locals.db.collection("users").insertOne(newUser)
  .then(result => {
    res.json(result)
  })

});


router.post('/login', function(req, res, next){
  const {email, password } = req.body;
  console.log(email, password);

  req.app.locals.db.collection("users").findOne({"email": email})
  .then(result => {
    if(crypto.SHA3(password).toString() === result.password){
        res.status(201).json({email: result.email, password: result.password})
      } else {
        res.status(401).json("Incorrect password or username");
      }
    }); 
  });




module.exports = router;
