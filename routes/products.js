var express = require('express');
var router = express.Router();

var controller = require("../controllers/products");



router.get('/', function(req, res){
    controller.getAll(function(products){
        res.locals.products = products;
        // console.log(products)
        res.render("index")
    })
    
})
router.get('/:id', function(req, res){
    var id = req.params.id;
    controller.getById(id, function(product){
        res.locals.product = product;
        res.render("details")
    })
    
})
module.exports = router;