const express = require("express");
const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all review routes
router.use(requireAuth);

//GET all reviews
router.get("/reviews", getReviews);

//GET a single review
router.get("/reviews/:id", getReview);

//POST a new review
router.post("/reviews", createReview);

//DELETE a review
router.delete("/reviews/:id", deleteReview);

//UPDATE a review
router.patch("/reviews/:id", updateReview);

module.exports = router;
