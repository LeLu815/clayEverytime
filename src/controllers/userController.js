import User from "../models/User";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import fetch from "cross-fetch";

let isExistId;
let isExistEmail;

export const getEdit = (req, res) => {
    res.render("edit-profile", {
        pageTitle:"edit-profile"
    });
}

export const postEdit = (req, res) => {

}

export const getJoin = (req, res) => {
    return res.render("join", {
        invisible : "",
        pageTitle:"Join",
    });
};

export const postJoin = async (req, res) => {
    const {name, email, username, password, password2, location} = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "비밀번호가 일치하지 않습니다.",
            invisible : "",
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
            invisible : "",
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
            invisible : "",
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
    return res.json(isExistId);
};

export const idCheck = async (req, res) => {
    const {id} = req.params;
    isExistId = await User.findOne({username:id});
    const isObject = isExistId instanceof Object;
    isExistId = isObject ? isExistId : {isExistId};
};

export const emailCheckSend = (req, res) => {
    return res.json(isExistEmail);
}

export const emailCheck = async (req, res) => {
    console.log(req.params);
    const {id} = req.params;
    isExistEmail = await User.findOne({email:id});
    const isObject = isExistEmail instanceof Object;
    isExistEmail = isObject ? isExistEmail : {isExistEmail};
    return res.status(200);
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

    const email = userData.kakao_account.email;
    if (!Boolean(email)) {
        console.log("여기1");
        return res.render("join", {
            name :userData.kakao_account.profile.nickname,
            invisible : "none",
        });
    }
    const existingEmail = await User.findOne({email});
    const username = email.split("@")[0];
    const existingUsername = await User.findOne({username});
    if (!Boolean(existingEmail)) {
        if(!Boolean(existingUsername)) {
            console.log("자 만든다~");
            const user = await User.create({
                socialOnly : true,
                email,
                name : userData.kakao_account.profile.nickname,
                username,
                password:"",
            });
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        }
        console.log("여기2");
        return res.render("join", {
            name :userData.kakao_account.profile.nickname,
            email,
            invisible : "none",
        })
    }

    if (existingEmail._id.toString() === existingUsername._id.toString()) {
        req.session.loggedIn = true;
        req.session.user = existingUsername;
        return res.redirect("/");
    }
    if (!Boolean(existingUsername) && !Boolean(existingEmail)) {
        const user = await User.create({
            socialOnly : true,
            email,
            name : userData.kakao_account.profile.nickname,
            username,
            password: "",
        });
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    }

    // 카카오톡 로그인 시도시 카카오메일이 이미 사용중이면 사용중 경고알람을 보내고 계정찾기 페이지로 넘겨야 한다.
    return res.render("join", {
        name :userData.kakao_account.profile.nickname,
        invisible : "none",
    });
};