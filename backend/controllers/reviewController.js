const Review = require('../models/reviewModel')
const mongoose = require('mongoose')

//get all reviews
const getReviews = async(req, res) => {
    const user_id = req.user._id

    const reviews = await Review.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(reviews)
}

//get a single review
const getReview = async(req, res) => {
    const { id } = req.params

    //not a valid object id (done to avoid a crash)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such review'})
    }

    const review = await Review.findById(id)

    if(!review) {
        return res.status(404).json({error: 'No such review'})
    }

    res.status(200).json(review)
}

//create new review
const createReview = async(req, res) => {
    const {title, text, overallRating} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!text) {
        emptyFields.push('text')
    }
    if(!overallRating) {
        emptyFields.push('overallRating')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try {
        const user_id = req.user._id
        const review = await Review.create({title, text, overallRating, user_id})
        res.status(200).json(review)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

//delete a review
const deleteReview = async(req, res) => {
    const { id } = req.params

    //not a valid object id (done to avoid a crash)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such review'})
    }

    const review = await Review.findOneAndDelete({_id: id})

    if(!review) {
        return res.status(404).json({error: 'No such review'})
    }

    res.status(200).json(review)
}

//update a review
const updateReview = async(req, res) => {
    const { id } = req.params

    //not a valid object id (done to avoid a crash)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such review'})
    }

    const review = await Review.findOneAndUpdate({_id: id}, {...req.body})

    if(!review) {
        return res.status(400).json({error: 'No such review'})
    }

    res.status(200).json(review)
}

module.exports = {
    getReviews,
    getReview,
    createReview,
    deleteReview,
    updateReview
}