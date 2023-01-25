const jwt = require('jsonwebtoken');

const generarJWT = (uid, username) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, username };

        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '1d'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);

        })

    })
}

module.exports = {
    generarJWT
}