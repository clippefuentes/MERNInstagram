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

router.post('/createPost', requiredLogin, async (req, res) => {
    try {
        const { title, caption, url } = req.body
        if (!title || !caption || !url) {
            return res.status(422).json({ error: "Please add all the fields" })
        }
        const currentUser = { ...req.user }
        delete currentUser.password
        const post = new Post({
            title, caption,
            photo: url,
            postedBy: currentUser
        })
        const result = await post.save()
        return res.json({ post: result })
    } catch (err) {
        console.log('err:', err)
        return res.json({ error: err })
    }
})

router.get('/mypost', requiredLogin, async (req, res) => {
    const userPosts = await Post
        .find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")

    return res.json({ posts: userPosts })
})

module.exports = router