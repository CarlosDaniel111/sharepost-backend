const { check, validationResult } = require('express-validator');

const registerValidator = [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check("password", "La contraseña necesita mas de 6 letras y menos de 20 letras").isLength({ min: 6, max: 20 }),
];

const loginValidator = [
    check('email', 'El email es obligatorio').isEmail(),
    check("password", "La contraseña necesita mas de 6 letras y menos de 20 letras").isLength({ min: 6, max: 20 }),
];

const postValidator = [
    check("description", "Es necesario ingresar texto").not().isEmpty()
];

const commentValidator = [
    check("descriptionComment", "Es necesario ingresar texto").not().isEmpty()
]

const checkErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }
    next();
}

module.exports = {
    registerValidator,
    loginValidator,
    postValidator,
    commentValidator,
    checkErrors
}