import User from "../models/User";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import fetch from "cross-fetch";

let isExist;



export const edit = (req, res) => res.send("Edit User");

export const getJoin = (req, res) => {
    return res.render("join");
};

export const postJoin = async (req, res) => {
    const {name, email, username, password, password2, location} = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "비밀번호가 일치하지 않습니다.",
        });
    }
    // const exists = await User.exists({ $or: [{username, email}] });
    const usernameExist = await User.exists({username});
    const emailExist = await User.exists({email});
    if(usernameExist) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "존재하는 아이디입니다.",
        });
    } else if (emailExist) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "존재하는 이메일입니다.",
        });
    }
    try {
        await User.create({
            name,
            email, 
            username, 
            password,
            location,
        });
        return res.redirect("/login");
    } catch(error) {
        return res.status(400).render("join", {
            pageTitle : "Upload",
            errorMessage : error._message,
        });
    }
};

export const remove = (req, res) => res.send("Remove User");

export const getLogin = (req, res) => {

    return res.render("login", {
        REST_API_KEY: process.env.REST_API_KEY,
        REDIRECT_URI: process.env.REDIRECT_URI,
    });
};
export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username, socialOnly:false});
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
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const idCheckSend = (req, res) => {
    return res.json(isExist);
}

export const idCheck = async (req, res) => {
    const {id} = req.params;
    isExist = await await User.findOne({username:id});
    const isObject = isExist instanceof Object;
    isExist = isObject ? isExist : {isExist};
    // console.log(id, isExist);
}

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const getKkt = async (req, res) => {
    const permissionCode = req.query.code;
    const uri = "https://kauth.kakao.com/oauth/token";
    const tokenRes = await (await fetch(uri, {
        method:"POST",
        headers: {
            'Content-Type':"application/x-www-form-urlencoded",
        },
        body:`grant_type=authorization_code&client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&code=${permissionCode}`,
    })).json();
    const token = tokenRes.access_token;
    let userData = await(
        await fetch("https://kapi.kakao.com//v2/user/me",{
            headers: {
                'Content-type': "application/x-www-form-urlencoded;charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
        })
    ).json();
    console.log(userData.kakao_account.email);
    const email = userData.kakao_account.email;
    const existingEmail = await User.findOne({email});
    if (!Boolean(email)) {
        return res.render("join", {
            name :userData.kakao_account.profile.nickname,
        });
    }
    const username = email.split("@")[0];
    const existingUsername = await User.findOne({username});

    if (existingEmail._id === existingUsername._id) {
        req.session.loggedIn = true;
        req.session.user = existingUsername;
        return res.redirect("/");
    }

    if (!Boolean(existingUsername)) {
        const user = await User.create({
            socialOnly : true,
            email,
            name : userData.kakao_account.profile.nickname,
            username,
        });
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    }
    return res.render("join", {
        name :userData.kakao_account.profile.nickname,
        email,
    });
}