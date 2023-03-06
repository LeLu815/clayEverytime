import User from "../models/User";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import fetch from "cross-fetch";
import Content from "../models/Content";
import CalenderInfo from "../models/CalenderInfo";
import KilnInfo from "../models/KilnInfo";

export const deleteKilnSchedule = async (req, res) => {
    const {id} = req.params;
    try {
        await KilnInfo.findByIdAndDelete(id);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(400).redirect("/");
    }
}

export const addKilnSchedule = async (req, res) => {
    const {
        params : {
            id
        },
        session : {
            user: {
                _id
            }
        },
    } = req;

    if (id.split(".").length !== 4) {
        return res.status(400).redirect("/");
    }
    const [kilnType, year, month, date] = id.split(".");

    try {
        await KilnInfo.create({
            kilnType,
            reservationDate : new Date(year, month, date),
            owner : _id
        });
    } catch (error) {
        console.log(error);
    }

    return res.redirect("/");
}

export const deleteCalenderInfo = async (req, res) => {
    const {id} = req.params;
    try {
        await CalenderInfo.findByIdAndDelete(id);
        return res.redirect("/");
    } catch(error) {
        console.log(error) 
        return res.status(400).redirect("/");
    }
}

export const getCalenderAddForm = async (req, res) => {
    // const yearMonthDate =  req.params;
    const {id} = req.params;
    const [year, month, date] = id.split("&");
    
    res.render("calenderAddForm", {
        year,
        month,
        date
    });
}

export const postCalenderAddForm = async (req, res) => {
    let isAllDay;
    const {
        body :{
            title,
            place,
            start_time,
            end_year,
            end_month,
            end_date,
            end_time,
            isPublic,
            description,
            save_cancel,
        },
        session : {
            user : {
                _id
            }
        },
        params :{id}
    } = req;

    
    if (save_cancel === "취소") {
        res.redirect("/");
    }

    if (req.body.hasOwnProperty("isAllDay")) {
        isAllDay = req.body.isAllDay;
    } else {
        isAllDay = 0;
    }
    try {
        const [start_Year, start_Month, start_Date] = id.split("&");
        const start_am_pm = start_time.split(" ")[0] === "오전" ? "am" : "pm"
        const [start_hour, start_minute] = start_time.split(" ")[1].split(":");
        const start_date = new Date(start_Year, Number(start_Month)-1, start_Date, start_am_pm === "오전" ? start_hour : Number(start_hour) +12, start_minute);

        if (isAllDay === "1") {
            const start_date = new Date(start_Year, start_Month, start_Date, 0, 0);
            const end_date = new Date(end_year, Number(end_month)-1, end_date, 23, 59);

            const calender = await CalenderInfo.create({
                title,
                place,
                start_date,
                end_date,
                isPublic : isPublic === 1 ? true : false,
                description,
                owner : _id
            });
        
            res.redirect("/");
        } 
        const end_am_pm = end_time.split(" ")[0] === "오전" ? "am" : "pm"
        const [end_hour, end_minute] = end_time.split(" ")[1].split(":");
        const end_date = new Date(end_year, Number(end_month)-1, end_month, end_am_pm === "오전" ? end_hour : Number(end_hour)+12, end_minute);

        const calender = await CalenderInfo.create({
            title,
            place,
            start_date,
            end_date,
            isPublic : isPublic === 1 ? true : false,
            description,
            owner : _id
        });

        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect(`/users/calenderAddForm/${id}`);
    }
}

export const deleteMyStuff = async (req, res) => {
    // 이 함수는 apiRouter로 연결한 함수로써 유저 프로파일 페이지에서 내 게시글과 댓글 삭제 역할을 함
    const { id } = req.params;
    const {user:{_id}} = req.session;
    const content = await Content.findById(id);
    const user = await User.findById(_id);
    if(String(content.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Content.findByIdAndDelete(id);
    user.contents = user.contents.filter((element)=> String(element) !== String(id));
    await user.save();
    return res.redirect(`/users/${_id}`);
}

export const see = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).populate("contents").populate("comment");
    if(!user) {
        return res.status(404).render("404");
    }

    return res.render("profile", {pageTitle: "User Profile", user});
}

export const getEdit = (req, res) => {
    res.render("edit-profile", {
        pageTitle:"edit-profile"
    });
}

export const postEdit = async (req, res) => {
    const {
        session :{ 
            user  :{
                _id
            }
        },
        body:{
            name,
            username,
            email,
        }, 
        file,
    } = req;



    let shouldResave = [];

    // 비교할 값들이 병렬적이다.
    const checkIsChanged = (attribute) => {
        return req.session.user[attribute] === req.body[attribute] ? false : attribute;
    }
    const checkDuplicate = async (attribute) => {
        const userInfo = req.body[attribute];
        const isExist = await User.exists({[attribute]:userInfo});
        return isExist ? isExist : false;
    }

    for (const property in req.body) {
        if (checkIsChanged(property)) {
            shouldResave.push(await checkDuplicate(property));
        }
    }
    const final = shouldResave.filter(boolean => boolean === true);

    // 세션에 있는 profileImage 를 가져와야 하는데 현재 없는 상태
    if (final.length === 0) {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            name,
            username,
            email,
            profileImage: file ? file.path : "",
        }, {new:true});
        req.session.user = updatedUser;
    }

    res.redirect("/users/edit");
}

export const getChangePassword = (req, res) => { 
    return res.render("change-password", {
        pageTitle:"Change-password"
    });
}
export const postChangePassword = async (req, res) => {
    const {
        session:{
            user:{_id}
        },
        body:{
            oldPassword, newPassword, newPassword2,
        },
    } = req;


    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword, user.password);

    if (!ok){
        return res.status(400).render("change-password", {
            errorMessage : "비밀번호가 틀렸습니다."
        });
    }

    if (newPassword !== newPassword2) {
        return res.status(400).render("change-password", {
            errorMessage : "새 비밀번호가 일치하지 않습니다."
        });
    }
    user.password = newPassword;
    await user.save();

    req.session.destroy();
    return res.redirect('/login');
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
    const user2 = await User.findOne({username});
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

export const idCheck = async (req, res) => {
    const {id} = req.params;
    let isExistId = await User.findOne({username:id});
    const isObject = isExistId instanceof Object;
    isExistId = isObject ? isExistId : {isExistId};
    return res.json(isExistId);
};

export const emailCheck = async (req, res) => {
    const {id} = req.params;
    let isExistEmail = await User.findOne({email:id});
    const isObject = isExistEmail instanceof Object;
    isExistEmail = isObject ? isExistEmail : {isExistEmail};
    return res.json(isExistEmail);
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