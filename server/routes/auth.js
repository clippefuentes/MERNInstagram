const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
// const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
const requireLogin = require('../middleware/requireLogin')
const router = express.Router()
const User = mongoose.model("User")
const { JWT_SECRET, SENDGRID_API, SENDGRID_FROM_EMAIL } = require('../config/keys')

sgMail.setApiKey(SENDGRID_API)

router.get('/protected', requireLogin, (req, res) => {
    res.send("Hello User")
})

router.post('/signup', async (req, res) => {
    const { name, email, password, url } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    try {
        const savedUser = await User.findOne({ email })

        if (savedUser) {
            return res.status(422).json({ error: "User exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email, name, password: hashedPassword, url
        })
        const newUser = await user.save()
        await sgMail.send({
            to: newUser.email,
            from: SENDGRID_FROM_EMAIL,
            subject: "Sign Up Success",
            html: `<h1> Welcome to Clynestagram </h1>`
        })
        return res.json({ message: "User Sign up", user: newUser })
    } catch (err) {
        console.log(err)
        return res.status(422).json({ error: err })
    }
})


router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(422).json({ error: "Please provide email or password" })
        }
        const savedUser = await User.findOne({ email })
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email or Password" })
        }
        const isMatch = await bcrypt.compare(password, savedUser.password)
        if (!isMatch) {
            return res.status(422).json({ error: "Invalid Email or Password" })
        } else {
            const token = jwt.sign({ 
                _id: savedUser._id
            }, JWT_SECRET)
            const { _id, name, email, followers, following, url } = savedUser
            console.log(savedUser)
            return res.json({
                message: "Successful Sign In",
                token,
                user: {
                    _id, name, email, followers, following, url
                }
            })
        }
    } catch (err) {
        return res.status(422).json({ error: err })
    }
})

router.post('/resetPassword', async (req, res) => {
    try {
        const { email } = req.body
        const buffer = crypto.randomBytes(32)
        const token = buffer.toString('hex')
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(422).json({ error: 'User Not exist' })
        }
        user.resetToken = token
        user.expireToken = Date.now() + (3_600_000)
        const currentUser = await user.save()
        await sgMail.send({
            to: currentUser.email,
            from: SENDGRID_FROM_EMAIL,
            subject: "Password Reset",
            html: `
                <p>You requested for password reset</p>
                <h5> Click this link to reset <h5>
                <a href="http://localhost:3000/reset/${token}"> This Link </a>
            `
        })
        return res.json({ message: "Message Sent" })
    } catch(err) {
        return res.status(422).json({ error: err })
    }
})

router.post('/newPassword', async (req, res) => {
    try {
        const { password, token } = req.body
        const user = await User.findOne({ 
            resetToken: token,
            expireToken: {
                $gt: Date.now()
            }
        })
        if (!user) {
            return res.status(422).json({ error: 'User token maybe expired' })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        user.password = hashedPassword
        user.resetToken = null
        user.expireToken = null
        await user.save()
        return res.json({ message: "Password Updated" })
    } catch (err) {
        return res.status(422).json({ error: err })
    }
})

module.exports = router