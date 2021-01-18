const Express = require("express");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");
const { query } = require("express");
//const Review = require('../models/Review');
const { Review } = require("../db");

//Create a Review
router.post("/review", validateSession, (req, res) => {
  try {
    console.log("from review create request", req.body);
    const reviewEntry = {
      reviewHeader: req.body.reviewHeader,
      reviewComment: req.body.reviewComment,
      date: Date.now(),
      rating: req.body.rating,
      userId: req.user.id,
      coffeeId: req.body.coffeeId,
    };

    Review.create(reviewEntry)
      .then((review) =>
        res.status(200).json({
          data: review,
          status: 200,
          message: "success",
        })
      )
      .catch((err) =>
        res
          .status(500)
          .json({ error: err, message: "could not create review", status: 500 })
      );
  } catch (error) {
    console.log("error from/review/review", error);
  }
});

//Read a review
router.get("/allreviews/:coffeeId", validateSession, function (req, res) {
  Review.findAll({ where: { coffeeId: req.params.coffeeId } })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: err }));
});

//Update a review
router.put("/update/:id", validateSession, function (req, res) {
  const updateReview = {
    reviewHeader: req.body.reviewHeader,
    reviewComment: req.body.reviewComment,
    date: req.body.date,
    rating: req.body.rating,
  };
  const query = { where: { id: req.params.id } };

  Review.update(updateReview, query)
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete a Review
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id } };
  Review.destroy(query)
    .then(() => res.status(200).json({ message: "review is removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
