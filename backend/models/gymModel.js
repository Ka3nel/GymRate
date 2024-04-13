const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    total_rating: {
        type: Number,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Gym', gymSchema)