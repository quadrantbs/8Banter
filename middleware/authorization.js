function checkAuthorization(req, res, next) {
    const userId = req.params.id;
    const userRole = req.user.role;
    const loggedInUserId = req.user.id;

    if (userRole === 'admin' || loggedInUserId == userId) {
        next();
    } else {
        res.status(403).send('Access denied. You are not authorized to access this resource.');
    }
}

module.exports = checkAuthorization;


