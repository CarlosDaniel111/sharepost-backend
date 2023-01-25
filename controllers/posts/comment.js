const Post = require('../../models/Post');

const addComment = async (req, res) => {
    try {
        const postId = req.params.post_id;
        let post = await Post.findById(postId);
        if (!post)
            return res.status(404).json({
                error: "El post no fue encontrado"
            });

        const { descriptionComment } = req.body;
        const newComment = {
            descriptionComment,
            user: req.userUid
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post);

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server Error"
        });
    }
}

const removeComment = async (req, res) => {
    try {
        const postId = req.params.post_id;
        let post = await Post.findById(postId);
        if (!post)
            return res.status(404).json({
                error: "El post no fue encontrado"
            });

        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);

        if (!comment) {
            return res.status(404).json({
                error: "El comentario no fue encontrado"
            });
        }

        if (comment.user.toString() !== req.userUid) {
            return res.status(403).json({
                error: "No tienes permiso para eliminar este post"
            });
        }

        const removeCommentFromComments = post.comments.filter(
            comment => comment._id.toString() !== req.params.comment_id
        )

        post.comments = removeCommentFromComments;
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
    addComment,
    removeComment
}