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
        res.render("home",{postSerialized,logged_in:req.session.logged_in});
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
        res.render("post",{oneSerialized,logged_in:req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/dashboard", withAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password","email"]},
            include: [{model:Post}]
        });
        const user = userData.get({plain: true});
        console.log(user);
        res.render("dashboard", {user,logged_in:req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render("login");
});

router.get("/signup", (req,res) => {
    res.render("signup");
});

module.exports = router;