const admin = (req, res, next) => {
    if (req.users && req.user.role === "admin") {
        next()
    } else {
        res.status(403).json({ message: "Access denied, admin only" })
    }
}

module.exports = admin