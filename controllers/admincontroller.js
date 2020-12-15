const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const coffee = require("../db").import('../models/Coffee');
const validateSession = require('../middleware/validate-session');
const { query } = require('express');


//Here is the create coffee endpoint for the admin portal.
router.post('/coffee', (req,res) => {
    const coffeeCreate = {
        
        coffeeNotes: req.body.coffeeNotes,
        coffeeOrigin: req.body.coffeeOrigin,
        price: req.body.price,
        description: req.body.description
    }
    coffee.create(coffeeCreate)
    .then(coffee => res.status(200).json(coffee))
    .catch(err => res.status(500).json({ error:err}))
});

//Here is the read coffee endpoint for the admin portal.
// router.get('/:coffees', (req, res) => {
//     let coffeeOrigin = req.params.coffee;

//     coffee.findAll({
//         where: {name : name}
//     })
//     .then(coffees => res.status(200).json(coffees))
//     .catch(err => res.status(500).json({ error: err }))
// })
router.get('/allcoffee', function (req, res) {
    coffee.findAll()
    .then(coffee => res.status(200).json(coffee))
    .catch(err=> res.status(500).json({error:err}))
});


//Here is the update coffee endpoint for the admin portal.
router.put("/update/:id",  function(req, res){
    const updateCoffee= {
        coffeeOrigin: req.body.coffeeOrigin,
        coffeeNotes: req.body.coffeeNotes,
        price: req.body.price,
        description: req.body.description
    };
    const query= { where: {id: req.params.id}}

    coffee.update(updateCoffee, query)
       .then((coffee)=> res.status(200).json(coffee))
       .catch((err) => res.status(500).json({error:err}))
})

//Here is the delete coffee endpoint for the admin portal.
router.delete("/delete/:id",  function (req, res){
    const query= {where: {id: req.params.id}};
    coffee.destroy(query)
    .then(()=> res.status(200).json({message: "coffee is removed"}))
    .catch((err) => res.status(500).json({error:err}))
})

module.exports=router;