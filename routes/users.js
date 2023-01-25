const express = require('express');

const { getUser, getUserById, loginUser, registerUser } = require('../controllers/users');
const { validarJWT } = require('../middlewares/authentication');
const { registerValidator, loginValidator, checkErrors } = require('../middlewares/expressValidator');

const router = express.Router();

router.get('/', validarJWT, getUser);
router.get('/user/:user_id', getUserById);
router.post('/login', loginValidator, checkErrors, loginUser);
router.post('/register', registerValidator, checkErrors, registerUser);

module.exports = router;