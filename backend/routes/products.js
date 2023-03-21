var express = require('express');
var router = express.Router();
const { ObjectId } = require("mongodb");


router.post('/add', function(req, res, next) {

    let newProduct = { name: req.body.name };
   
    newProduct.description = req.body.description;
    newProduct.price = req.body.price;
    newProduct.lager= req.body.lager;
console.log(newProduct);
    req.app.locals.db.collection("products").insertOne(newProduct)
    .then(result =>{
        res.json(result);
    })
});

router.get('/', function(req, res, next) {
  
    req.app.locals.db.collection("products").find().toArray()
    .then(result => {
      res.json(result)
    })
  }); 

  router.get('/:productsId', function(req, res, next) {
    productsId = req.params.productsId;
  
    req.app.locals.db.collection("products").findOne({"_id": new ObjectId(productsId) })
    .then(result => {
      res.json(result)
    })
  });


module.exports = router;
