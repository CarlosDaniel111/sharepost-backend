const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

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

        req.uid = uid;
        req.username = username;


    } catch (error) {
        return res.status(401).json({
            error: 'Token no válido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}