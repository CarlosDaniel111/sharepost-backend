const express = require('express');

const { getUser, getUserById } = require('../controllers/users/user');
const { loginUser, registerUser } = require('../controllers/users/login')
const { validarJWT } = require('../middlewares/authentication');
const { registerValidator, loginValidator, checkErrors } = require('../middlewares/expressValidator');

const router = express.Router();

router.get('/', validarJWT, getUser);
router.get('/user/:user_id', getUserById);
router.post('/login', loginValidator, checkErrors, loginUser);
router.post('/register', registerValidator, checkErrors, registerUser);

module.exports = router;