const express = require('express')
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const User = mongoose.model("User")
const router = express.Router()
const requiredLogin = require('../middleware/requireLogin')

router.get('/user/:id', requiredLogin, async (req, res) => {
    try {
        const { id } = req.params
        console.log('id', id)
        const user = await User.findOne({ _id: id }).select("-password")
        const posts = await Post.find({ postedBy: id })
            .populate("postedBy", "_id name")
            .exec()
        return res.json({ user, posts })
    } catch(err) {
        return res.json({ error: err })
    }
})

module.exports = router