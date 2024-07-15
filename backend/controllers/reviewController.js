const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

//get all reviews of a certain user
const getUserReviews = async (req, res) => {
  const user_id = req.user._id;

  const reviews = await Review.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(reviews);
};

//get all reviews of a certain gym
const getGymReviews = async (req, res) => {
  const gym_id = req.params.gym_id;

  const reviews = await Review.find({ gym_id }).sort({ createdAt: -1 });

  res.status(200).json(reviews);
};

//get a single review
const getReview = async (req, res) => {
  const { id } = req.params;

  //not a valid object id (done to avoid a crash)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

//create new review
const createReview = async (req, res) => {
  const {
    gym_id,
    title,
    content,
    crowdness_rating,
    machine_modernity_rating,
    machine_variety_rating,
    cleanliness_rating,
    vibe_rating,
    overall_rating,
  } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!crowdness_rating) {
    emptyFields.push("crowdness rating");
  }
  if (!machine_modernity_rating) {
    emptyFields.push("machine modernity rating");
  }
  if (!machine_variety_rating) {
    emptyFields.push("machine variety rating");
  }
  if (!cleanliness_rating) {
    emptyFields.push("cleanliness rating");
  }
  if (!vibe_rating) {
    emptyFields.push("vibe rating");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //add doc to db
  try {
    const user_id = req.user._id;
    const review = await Review.create({
      user_id,
      gym_id,
      title,
      content,
      crowdness_rating,
      machine_modernity_rating,
      machine_variety_rating,
      cleanliness_rating,
      vibe_rating,
      overall_rating,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  //not a valid object id (done to avoid a crash)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findOneAndDelete({ _id: id });

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

//update a review
const updateReview = async (req, res) => {
  const { id } = req.params;

  //not a valid object id (done to avoid a crash)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!review) {
    return res.status(400).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

module.exports = {
  getUserReviews,
  getGymReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};
