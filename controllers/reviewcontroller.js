const Express = require("express");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");
const { query } = require("express");
//const Review = require('../models/Review');
const { Review, User } = require("../db");

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
  Review.findAll({
    where: { coffeeId: req.params.coffeeId },
    include: [{ model: User, attributes: ["firstName", "lastName"] }],
    order:[['createdAt','DESC']]
  })
    .then((review) =>
      res.status(200).json({ data: review, status: 200, message: "success" })
    )
    .catch((err) =>
      res.status(500).json({ data: err, status: 500, message: "failed" })
    );
});

//Update a review
router.put("/update/:id", validateSession, function (req, res) {
  const updateReview = {
    reviewHeader: req.body.reviewHeader,
    reviewComment: req.body.reviewComment,
    rating: req.body.rating,
  };
  const query = { where: { id: req.params.id } };

  Review.update(updateReview, query)
    .then((review) => res.status(200).json({data:review,status:200,message:'success'}))
    .catch((err) => res.status(500).json({ data: err,status:500,message:'error' }));
});

//Delete a Review
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id } };
  Review.destroy(query)
    .then((data) => res.status(200).json({ data ,status:200,message: "review is removed" }))
    .catch((err) => res.status(500).json({ data: err, status:500, message:'error' }));
});

module.exports = router;
