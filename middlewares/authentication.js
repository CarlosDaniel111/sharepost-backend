const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const token = req.header('authentication-token');

    if (!token) {
        return res.status(401).json({
            error: 'No hay token en la petición'
        });
    }

    try {

        const { uid, username } = jwt.verify(
            token,
            process.env.SECRET_JWT
        );

        req.userUid = uid;
        req.userUsername = username;


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            error: 'Token no válido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}