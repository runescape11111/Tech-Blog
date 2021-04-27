const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req,res) => {
    try {
        const allPost = await Post.findAll({
            include: [{
                model: User,
                attributes: ["name"]
            }]
        });
        const postSerialized = allPost.map(post => post.get({plain:true}));
        res.render("home",{postSerialized,logged_in:true});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/post/:id", async (req,res) => {
    try {
        const onePost = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"]
                },
                {
                    model: Comment
                }
            ]
        });
        const oneSerialized = onePost.get({plain:true});
        oneSerialized.comments.forEach(async comment => {
            const user = await User.findByPk(comment.user_id);
            comment.user_name = user.name;
        });
        console.log(oneSerialized);
        res.render("post",{oneSerialized,logged_in:true});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;