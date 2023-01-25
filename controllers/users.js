const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userUid).select("-password");
        res.json(user);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server error"
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server error"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                error: "Email o contraseña incorrecto"
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(404).json({
                error: "Email o contraseña incorrecto"
            });
        }

        // Generar JWT
        const token = await generarJWT(user.id, user.username);
        res.json({
            uid: user.id,
            username: user.username,
            token
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Server error"
        });
    }
}

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userUsername = await User.findOne({ username });
        const userEmail = await User.findOne({ email });
        if (userUsername) {
            return res.status(400).json({
                error: "El username ya ha sido utilizado"
            });
        }
        if (userEmail) {
            return res.status(400).json({
                error: "El email ya ha sido utilizado"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generar JWT
        const token = await generarJWT(newUser.id, newUser.username);

        res.status(201).json({
            uid: newUser.id,
            username: newUser.username,
            token
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'Server error'
        });
    }

}

module.exports = {
    getUser,
    getUserById,
    loginUser,
    registerUser
}