const User = require('../../models/User');

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

module.exports = {
    getUser,
    getUserById
}