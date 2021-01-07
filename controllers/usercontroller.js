const router = require('express').Router();
const User = require("../db").import("../models/user")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
//const Coffee = require('../models/Coffee');



router.post('/signup', (req, res) => {

    console.log('what came?', req.body);
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        isAdmin: false
    })
    .then(user => {
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.json({
            user:user,
            message: "user was created successfully",
            sessionToken: token
        })
    })
    .catch(err => res.status(500).send(err))
})



router.post('/login', validateSession, (req, res) =>{
     
    User.findOne({
        where:{email: req.body.email}
    })
    .then(user => {
        if(user){
            
                bcrypt.compare(req.body.user.password, user.password, (err, matches) =>{
                    if(matches){
                        const token=jwt.sign({id:user.id},process.env.JWT_SECRET, {expiresIn:"7d"})
                        res.status(200).json({
                            user:user,
                            message: "successfully authenticated",
                            sessionToken:token
                        })
                    }else {
                        res.status(502).json({error:'password mismatch'})
                    }
                })
            
        } else {
            res.status(500).json({error:'user not found'});
        }
    })
    .catch(err=> res.status(500).json({error:err}))
})


router.get('/coffee', (req, res) => {
    User.findAll(
        // coffeeOrigin: req.body.coffeeOrigin,
        // coffeeNotes: req.body.coffeeNotes,
        // price: req.body.price,
        // description: req.body.description
        //Don't need these in a get request.
    )
    .then(coffee => {
        res.json({
            coffee: coffee,
            message: "coffee was successfully read!"
        })
    })
//    .then(coffee => res.status(200).json(coffee))
   .catch(err => res.status(500).json({error:err}))
})


module.exports=router;
