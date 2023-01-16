export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "흙타";
    res.locals.loggedInUser = req.session.user;
    console.log(res.locals.loggedIn);
    next();
}