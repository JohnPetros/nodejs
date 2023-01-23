module.exports = {
    isAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.admin) {
            return next();
        }
        req.flash("error_msg", "Você precisa ser admin")
        res.redirect("/")
    }
}