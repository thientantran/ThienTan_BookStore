var controller = {}
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
var models = require("../models");
var Products = models.Product;

controller.getAll = function(callback){
    Products
    .findAll()
    .then(function(products){
        products.forEach(function(product){
            product.price = parseFloat(product.price).toFixed(2);
        })
        callback(products)
    })
};

controller.getById = function(id, callback){
    Products.findOne({
        where:{id:id},
        
    })
    .then(function(product){
        product.price = parseFloat(product.price).toFixed(2);
        callback(product);
    })
}



controller.search = function(query, callback){
    Products.findAll({
        where:{
            
            [Op.or]:[
                {
                    name:{
                        [Op.iLike]:`%${query}%`
                    }
                },{
                    summary:{
                        [Op.iLike]:`%${query}%`
                    }
                },{
                    description:{
                        [Op.iLike]:`%${query}%`
                    }
                }
                    
            ]
        }
    })
    .then(function(products){
        products.forEach(function(product){
            product.price = parseFloat(product.price).toFixed(2);
        });
        // console.log(products);
        callback(products);
    })
}


module.exports = controller;