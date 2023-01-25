const Post = require('../../models/Post');

const addLike = async (req, res) => {
    try {
        const postId = req.params.post_id;
        let post = await Post.findById(postId);
        if (!post)
            return res.status(404).json({
                error: "El post no fue encontrado"
            });
        if (post.likes.find(like => like.user.toString() === req.userUid))
            return res.status(401).json({
                error: "Ya has dado like a este post"
            });

        const newLike = {
            user: req.userUid
        };

        post.likes.unshift(newLike);
        await post.save();
        res.json(post);

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server Error"
        });
    }
}

const removeLike = async (req, res) => {
    try {
        const postId = req.params.post_id;
        let post = await Post.findById(postId);
        if (!post)
            return res.status(404).json({
                error: "El post no fue encontrado"
            });

        const removeLikeFromPost = post.likes.filter(
            like => like.user.toString() !== req.userUid.toString()
        );

        post.likes = removeLikeFromPost;

        await post.save();
        res.json(post);

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server Error"
        });
    }
}

module.exports = {
    addLike,
    removeLike
}