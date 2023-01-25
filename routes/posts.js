const express = require('express');

const { getPosts, getPost, createPost, removePost } = require('../controllers/posts/posts');
const { getUserPostsById, getMyPosts } = require('../controllers/posts/userPosts');
const { addLike, removeLike } = require('../controllers/posts/like');
const { addComment, removeComment } = require('../controllers/posts/comment');
const { validarJWT } = require('../middlewares/authentication');
const { postValidator, commentValidator, checkErrors } = require('../middlewares/expressValidator');

const router = express.Router();

router.get('/posts', getPosts);
router.get('/post/:post_id', getPost);
router.get('/user_posts/:user_id', getUserPostsById);
router.get('/user_posts', validarJWT, getMyPosts);

router.post('/post', validarJWT, postValidator, checkErrors, createPost);

router.put('/like/:post_id', validarJWT, addLike);
router.put('/comment/:post_id', validarJWT, commentValidator, checkErrors, addComment);

router.delete('/post/:post_id', validarJWT, removePost);
router.delete('/like/:post_id', validarJWT, removeLike);
router.delete('/comment/:post_id/:comment_id', validarJWT, removeComment);

module.exports = router;