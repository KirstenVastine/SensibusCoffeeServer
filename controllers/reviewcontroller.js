const Express = require('express');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
const { query } = require('express');
//const Review = require('../models/Review');
const Review = require("../db").import('../models/Review');

//Create a Review
router.post('/review', validateSession, (req, res) => {
    const reviewEntry = {
        reviewHeader: req.body.reviewHeader,
        reviewComment: req.body.reviewComment,
        date: req.body.date,
        rating: req.body.rating
    }
    Review.create(reviewEntry)
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({error:err}))
});

//Read a review
router.get('/allreviews', validateSession, function (req, res) {
    Review.findAll()
    .then(review => res.status(200).json(review))
    .catch(err=> res.status(500).json({error:err}))
});

//Update a review
router.put("/update/:id", validateSession, function(req, res){
    const updateReview= {
        reviewHeader: req.body.reviewHeader,
        reviewComment: req.body.reviewComment,
        date: req.body.date,
        rating: req.body.rating
    };
    const query= { where: {id: req.params.id}}

    Review.update(updateReview, query)
       .then((review)=> res.status(200).json(review))
       .catch((err) => res.status(500).json({error:err}))
})

//Delete a Review
router.delete("/delete/:id", validateSession, function (req, res){
    const query= {where: {id: req.params.id}};
    Review.destroy(query)
    .then(()=> res.status(200).json({message: "review is removed"}))
    .catch((err) => res.status(500).json({error:err}))
})


module.exports = router;