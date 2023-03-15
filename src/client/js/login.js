
const wipeUsername = document.getElementById("wipeUsername");
const wipePassword = document.getElementById("wipePassword");

wipeUsername.addEventListener("click", function() {
    const text = document.getElementById("usernameInput").value;
    if (text === "" || !text) {
        return;
    }
    document.getElementById("usernameInput").value = "";
});

wipePassword.addEventListener("click", function() {
    const text = document.getElementById("passwordInput").value;
    if (text === "" || !text) {
        return;
    }
    document.getElementById("passwordInput").value = "";
});

const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");

usernameInput.addEventListener("focus", function() {
   document.getElementById("wipeUsername").style.display = "block";
});
usernameInput.addEventListener("blur", function() {
    const text = document.getElementById("usernameInput").value;
    if (text && text !== "") {
        return;
    }
    document.getElementById("wipeUsername").style.display = "none";
 });

passwordInput.addEventListener("focus", function() {
    document.getElementById("wipePassword").style.display = "block";
});
passwordInput.addEventListener("blur", function() {
    const text = document.getElementById("passwordInput").value;
    if (text && text !== "") {
        return;
    }
    document.getElementById("wipePassword").style.display = "none";
});