const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const passwordCheck = document.getElementById("passwordCheck");
const submitBtn = document.getElementById("submitBtn");
const usernameMsg = document.getElementById("usernameMsg");
const username = document.getElementById("username");
const email = document.getElementById("email");
const emailMsg = document.getElementById("emailMsg");

// alert("connected");
let passwordInnerText;
let ok = false;
let okay = false;

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
        // 먼저 포스트로 보내고 다시 get으로 정보를 받아야한다.
        fetch(url, {
            method: "POST",
        });

        const data = await fetch(url);
        const response = await data.json();
        okay = Boolean(response.isExistEmail);

        if (okay) {
            emailMsg.innerText = "이미 사용중인 이메일입니다."
        } else {
            emailMsg.innerText = "사용가능한 이메일입니다."
        }          
    } else {
        emailMsg.innerText = "이메일을 입력하세요."
    }
});

username.addEventListener("keyup", async function () {
    const id = username.value;
    const idOk = id.replace(/(\s*)/g,'');
    let url =  Boolean(idOk) ? `/api/join/${id}/idChecks` : false;

    if(url) {
        fetch(url, {
            method: "POST",
        });
        
        const response = await fetch(url);
        const data = await response.json();
        ok = Boolean(data.isExistId);
        if (ok) {
            usernameMsg.innerText = "이미 사용중인 아이디입니다."
        } else {
            usernameMsg.innerText = "사용가능한 아이디입니다."
        }
    } else {
        usernameMsg.innerText = "아이디를 입력하세요.";
    }
});

password.addEventListener("keyup", function(){
    passwordInnerText = password.value;
});
password2.addEventListener("keyup", function(){
    if (password2.value === passwordInnerText) {
        passwordCheck.style.visibility = "visible";
        passwordCheck.innerText = "일치합니다."
        submitBtn.disabled = !ok ? false : true;
    } else if (password2.value === "") {
        passwordCheck.style.visibility = "hidden";
        submitBtn.disabled = true;
    } else {
        passwordCheck.style.visibility = "visible";
        passwordCheck.innerText = "일치하지 않습니다."
        submitBtn.disabled = true;
    }
});
