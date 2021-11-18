const express = require('express')
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const router = express.Router()
const requiredLogin = require('../middleware/requireLogin')

router.get('/allpost', async (req, res) => {
    try {
        const allPost = await Post.find()
            .populate("postedBy", "_id name")
        return res.json({ posts: allPost })
    } catch (err) {
        return res.json({ error: err })
    }
})

router.post('/createpost', requiredLogin, async (req, res) => {
    try {
        const { title, body } = req.body
        if (!title || !body) {
            return res.status(422).json({ error: "Please add all the fields" })
        }
        const currentUser = { ...req.user }
        delete currentUser.password
        console.log(req.user)
        const post = new Post({
            title, body, 
            postedBy: currentUser
        })
        const result = await post.save()
        return res.json({ post: result })
    } catch (err) {
        return res.json({ error: err })
    }
})

module.exports = router