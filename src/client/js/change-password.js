const submit = document.getElementById("submit");
const newPassword = document.getElementById("newPassword");
const newPassword2 = document.getElementById("newPassword2");
const oldPassword = document.getElementById("oldPassword")
const msg = document.getElementById("msg");

let ok = false;

submit.disabled = true;
newPassword2.addEventListener("keyup", function(){
    console.log(newPassword2.value);
    if (newPassword.value !== newPassword2.value) {
        msg.innerText = "비밀번호가 다릅니다."
        submit.disabled = true;
    } else if(newPassword2.value === "") {
        msg.innerText = "비밀번호를 입력해주세요."
        submit.disabled = true;
    } else {
        msg.innerText = "비밀번호가 일치합니다."
        submit.disabled = ok ? false : true;
    }
});

oldPassword.addEventListener("keyup", function(){
    if(oldPassword.value === "") {
        ok = false
        submit.disabled = true;
    } else {
        ok = true;
        submit.disabled = newPassword.value === newPassword2.value && newPassword.value !== "" ? false : true;
    }
});