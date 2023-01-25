const Post = require('../../models/Post');
const User = require('../../models/User');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort('-date')
            .populate('user', '_id username')
            .populate('likes.user', '_id username')
            .populate('comments.user', '_id username');
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

const getPost = async (req, res) => {
    try {
        const postId = req.params.post_id;
        const post = await Post.findById(postId)
            .populate('user', '_id username')
            .populate('likes.user', '_id username')
            .populate('comments.user', '_id username');
        res.json({
            post
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server Error"
        });
    }
}

const createPost = async (req, res) => {
    try {
        const { description, urlImage } = req.body;
        const user = await User.findById(req.userUid).select("-password");
        if (!user)
            return res.status(404).json({
                error: "Usuario no encontrado"
            });

        const newPost = Post({
            description,
            urlImage,
            user: user.id
        });

        await newPost.save();

        res.status(201).json({
            newPost
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server Error"
        });
    }

}

const removePost = async (req, res) => {
    try {
        const postId = req.params.post_id;
        const post = await Post.findById(postId);
        if (!post)
            return res.status(404).json({
                error: "Post no encontrado"
            });
        if (post.user.toString() !== req.userUid.toString())
            return res.status(403).json({
                error: "No tienes permiso para eliminar este post"
            });

        await post.remove();

        res.json({
            ok: "true"
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server Error"
        });
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    removePost
}