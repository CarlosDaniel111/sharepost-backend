const Post = require('../../models/Post');

const getUserPostsById = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const posts = await Post.find({ user: userId }).sort('-date').populate('user', '_id username');
        res.json({
            posts
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server Error"
        });
    }
}

const getMyPosts = async (req, res) => {
    try {
        const userId = req.userUid;
        const posts = await Post.find({ user: userId }).sort('-date').populate('user', '_id username');
        res.json({
            posts
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server Error"
        });
    }
}

module.exports = {
    getUserPostsById,
    getMyPosts
}