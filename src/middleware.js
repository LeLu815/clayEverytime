import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "흙타";
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!res.locals.loggedIn) {
        next();
    } else {
        return res.redirect("/");
    }
}

export const uploadFiles = multer({ dest: 'uploads/' , limits:{
    fileSize : 10000000,
}});