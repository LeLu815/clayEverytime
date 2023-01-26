const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const passwordCheck = document.getElementById("passwordCheck");
const submitBtn = document.getElementById("submitBtn");
const usernameMsg = document.getElementById("usernameMsg");
const username = document.getElementById("username");
const email = document.getElementById("email");
const emailMsg = document.getElementById("emailMsg");
const invisiblePw = document.getElementById("invisiblePw");

// alert("connected");
let passwordInnerText;
let ok = false;
let okayEmail = false;
let okayId = false;
let okPw = false;

if (invisiblePw.style.display === "none") {
    okPw = true;
}

function validEmailCheck(email){
    var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return (email.match(pattern)!=null)
}

email.addEventListener("keyup", async function () {
    const internetMail = email.value.replace(/(\s*)/g,'');
    let url = Boolean(internetMail) ? `/api/join/${internetMail}/emailChecks` : false;

    if(url) {
        if (!validEmailCheck(internetMail)) {
            emailMsg.innerText = "올바른 이메일 주소를 입력해주세요."
            return;
        }
        const response = await fetch(url, {
            method : "POST",
        });
        const data = await response.json();
        
        if (data.isExistEmail !== null) {
            emailMsg.innerText = "이미 사용중인 이메일입니다."
            okayEmail = false;
        } else {
            emailMsg.innerText = "사용가능한 이메일입니다."
            okayEmail = true;
        }          
    } else {
        emailMsg.innerText = "이메일을 입력하세요."
        okayEmail = false;
    }
    submitBtn.disabled = okayEmail && okayId && okPw ? false : true;
});

username.addEventListener("keyup", async function () {
    const id = username.value;
    const idOk = id.replace(/(\s*)/g,'');
    let url =  Boolean(idOk) ? `/api/join/${id}/idChecks` : false;

    if(url) {
        const response = await fetch(url, {
            method: "POST",
        });
        const data = await response.json();

        if (data.isExistId !== null) {
            usernameMsg.innerText = "이미 사용중인 아이디입니다."
            okayId = false;
        } else {
            usernameMsg.innerText = "사용가능한 아이디입니다."
            okayId = true;
        }
    } else {
        usernameMsg.innerText = "아이디를 입력하세요.";
        okayId = false;
    }
    submitBtn.disabled = okayEmail && okayId && okPw ? false : true;
});

password.addEventListener("keyup", function(){
    passwordInnerText = password.value;
});
password2.addEventListener("keyup", function(){
    if (password2.value === passwordInnerText) {
        passwordCheck.style.visibility = "visible";
        passwordCheck.innerText = "일치합니다."
        okPw = true;
        submitBtn.disabled = okayEmail && okayId && okPw ? false : true;
    } else if (password2.value === "") {
        passwordCheck.style.visibility = "hidden";
        okPw = false;
        submitBtn.disabled = okayEmail && okayId && okPw ? false : true;
    } else {
        passwordCheck.style.visibility = "visible";
        passwordCheck.innerText = "일치하지 않습니다."
        okPw = false;
        submitBtn.disabled = okayEmail && okayId && okPw ? false : true;
    }
});
