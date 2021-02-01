const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const {Coffee, Review} = require("../db");
const validateSession = require('../middleware/validate-session');
const { query } = require('express');


//Here is the create coffee endpoint for the admin portal.
router.post('/coffee', (req,res) => {
    const coffeeCreate = {
        
        coffeeNotes: req.body.coffeeNotes,
        coffeeOrigin: req.body.coffeeOrigin,
        price: req.body.price,
        description: req.body.description,
        imageURL: req.body.imageURL
    }
    Coffee.create(coffeeCreate)
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
    Coffee.findAll({
        include:[
            {model:Review}
        ]
    })
    .then(coffee => res.status(200).json(coffee))
    .catch(err=> res.status(500).json({error:err}))
});


// router.get("/:coffeeId", function (req, res) {
//   Coffee.findOne({
//     where: { id: req.params.coffeeId },
//     include: [{ model: Review }],
//   })
//     .then((coffee) =>
//       res.status(200).json({ data: coffee, status: 200, message: "success" })
//     )
//     .catch((err) =>
//       res.status(500).json({ error: err, status: 500, message: "failed" })
//     );
// });

router.get("/:coffeeId", function (req, res) {
  Coffee.findOne({
    where: { id: req.params.coffeeId },
    include: [{ model: Review }],
  })
    .then((coffee) =>
      res.status(200).json({ data: coffee, status: 200, message: "success" })
    )
    .catch((err) =>
      res.status(500).json({ error: err, status: 500, message: "failed" })
    );
});


//Here is the update coffee endpoint for the admin portal.
router.put("/update/:id",  function(req, res){
    const updateCoffee= {
        coffeeOrigin: req.body.coffeeOrigin,
        coffeeNotes: req.body.coffeeNotes,
        price: req.body.price,
        description: req.body.description,
        imageURL: req.body.imageURL
    };
    const query= { where: {id: req.params.id}}

    Coffee.update(updateCoffee, query)
       .then((coffee)=> res.status(200).json(coffee))
       .catch((err) => res.status(500).json({error:err}))
})

//Here is the delete coffee endpoint for the admin portal.
router.delete("/delete/:id",  function (req, res){
    const query= {where: {id: req.params.id}};
    Coffee.destroy(query)
    .then(()=> res.status(200).json({message: "coffee is removed"}))
    .catch((err) => res.status(500).json({error:err}))
})

module.exports=router;