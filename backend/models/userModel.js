const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, username, password) {

    // validation
    if(!email || !username || !password) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(username.includes('@')) {
        throw Error("Cannot use the '@' character in your username")
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const emailExists = await this.findOne({ email })
    const usernameExists = await this.findOne({ username })

    if (emailExists) {
        throw Error('Email already in use')
    }
    if (usernameExists) {
        throw Error('Username is taken')
    }

    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, username, password: hash})

    return user
}

// static login method
userSchema.statics.login = async function(emailOrUsername, password) {
    
    // validation
    if(!emailOrUsername || !password) {
        throw Error('All fields must be filled')
    }

    var user;

    if(emailOrUsername.includes('@')) {
        const email = emailOrUsername
        user = await this.findOne({ email })
    }
    else {
        const username = emailOrUsername
        user = await this.findOne({ username })
    }

    if(!user) {
        throw Error('Incorrect email or username')
    }

    const match  = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)