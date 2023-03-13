

const url_list = window.location.pathname.split("/");
let pageName = url_list.pop();

if (
    pageName === "blackCarrot" || pageName === "secretLounge" || pageName === "shareInfoLounge" || pageName === "user_select_div") {
} else {
    pageName = url_list.pop();
}

if (pageName === "blackCarrot") {
    document.getElementById("bottom_carrot_bar").style.display = "block";
    document.getElementById("bottom_secret_bar").style.display = "none";
    document.getElementById("bottom_info_bar").style.display = "none";
    document.getElementById("bottom_user_bar").style.display = "none";

    document.getElementById("carrot_select_div_a").style.color = "black";
    document.getElementById("secret_select_div_a").style.color = "#9b9b9b";
    document.getElementById("info_select_div_a").style.color = "#9b9b9b";
    document.getElementById("user_select_div_a").style.color = "#9b9b9b";

} else if (pageName === "secretLounge") {
    document.getElementById("bottom_secret_bar").style.display = "block";
    document.getElementById("bottom_carrot_bar").style.display = "none";
    document.getElementById("bottom_info_bar").style.display = "none";
    document.getElementById("bottom_user_bar").style.display = "none";

    document.getElementById("carrot_select_div_a").style.color = "#9b9b9b";
    document.getElementById("secret_select_div_a").style.color = "black";
    document.getElementById("info_select_div_a").style.color = "#9b9b9b";
    document.getElementById("user_select_div_a").style.color = "#9b9b9b";
    
} else if (pageName === "shareInfoLounge") {
    document.getElementById("bottom_info_bar").style.display = "block";
    document.getElementById("bottom_carrot_bar").style.display = "none";
    document.getElementById("bottom_secret_bar").style.display = "none";
    document.getElementById("bottom_user_bar").style.display = "none";

    document.getElementById("carrot_select_div_a").style.color = "#9b9b9b";
    document.getElementById("secret_select_div_a").style.color = "#9b9b9b";
    document.getElementById("info_select_div_a").style.color = "black";
    document.getElementById("user_select_div_a").style.color = "#9b9b9b";

} else if (pageName === "user_select_div") {
    document.getElementById("bottom_user_bar").style.display = "block";
    document.getElementById("bottom_carrot_bar").style.display = "none";
    document.getElementById("bottom_secret_bar").style.display = "none";
    document.getElementById("bottom_info_bar").style.display = "none";

    document.getElementById("carrot_select_div_a").style.color = "#9b9b9b";
    document.getElementById("secret_select_div_a").style.color = "#9b9b9b";
    document.getElementById("info_select_div_a").style.color = "#9b9b9b";
    document.getElementById("user_select_div_a").style.color = "black";
}

