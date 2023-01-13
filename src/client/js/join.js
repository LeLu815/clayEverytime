import User from "../../models/User"
import bcrypt from "bcrypt";

const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const passwordCheck = document.getElementById("passwordCheck");
const submitBtn = document.getElementById("submitBtn");
const usernameCheck = document.getElementById("usernameCheck");
const usernameMsg = document.getElementById("usernameMsg");

// alert("connected");
let passwordInnerText;
let ok = false;


usernameCheck.addEventListener("click", async function () {
    const id = usernameCheck.value;
    const user = await User.findOne({id});
    if (user) {
        usernameMsg.innerText = "이미 존재하는 아이디입니다."
    } else {
        ok = true;
        usernameMsg.innerText = "사용가능한 아이디입니다."
    }
});

password.addEventListener("keyup", function(){
    passwordInnerText = password.value;
});
password2.addEventListener("keyup", function(){
    if (password2.value === passwordInnerText) {
        passwordCheck.style.visibility = "visible";
        passwordCheck.innerText = "일치합니다."
        submitBtn.disabled = ok ? false : true;
    } else if (password2.value === "") {
        passwordCheck.style.visibility = "hidden";
        submitBtn.disabled = true;
    } else {
        passwordCheck.style.visibility = "visible";
        passwordCheck.innerText = "일치하지 않습니다."
        submitBtn.disabled = true;
    }
});
