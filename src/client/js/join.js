const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const passwordCheckClass = document.getElementById("passwordCheck");

passwordCheckClass.innerText = "우선 연결은 됨";

// alert("connected");

const comparePw = function(){
    alert("값 :", password.value);
};

passwordCheckClass.addEventListener("click", comparePw);
// passwordCheck.addEventListener("click", comparePw);
