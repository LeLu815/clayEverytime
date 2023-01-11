import User from "../models/User";
import bcrypt from "bcrypt";

const fakeUser = {
    username : "Leein",
    LoggedIn : false,
};

export const edit = (req, res) => res.send("Edit User");

export const getJoin = (req, res) => {
    return res.render("join", {fakeUser});
};

export const postJoin = (req, res) => {
    const {name, email, username, password, password2, location} = req.body;
    

};

export const remove = (req, res) => res.send("Remove User");

export const getLogin = (req, res) => {
    return res.render("login", {fakeUser});
};
export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username}) ;
    if (!user) {
        return res.status(404).render("login", {
            errorMessage: "잘못된 아이디입니다.",
        });
    }
    const ok = bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(404).render("login", {
            errorMessage: "잘못된 비밀번호입니다."
        });
    }
    return res.redirect("/");
};


export const logout = (req, res) => res.send("Log out");

export const see = (req, res) => res.send("See User");