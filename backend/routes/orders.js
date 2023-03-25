var express = require('express');
var router = express.Router();
const { ObjectId } = require("mongodb");
const Order = require('../models/Order');
const User = require('../models/User');


router.post('/add', (req, res) => { 
    const user = req.body; 
      
    req.app.locals.db.collection("orders").insertOne(user)
    .then(result =>{
        res.json(result);
    })
});

router.get('/all', (req, res) => { 

  req.app.locals.db.collection("orders").find().toArray()
  .then(result => {
    res.json(result)
  })

})

    

  


module.exports = router;
