function checkedFunc(id){
    const a_tag = document.querySelector(`.${id}`);
    if (a_tag.style.textDecorationLine === "line-through") {
        a_tag.style.textDecorationLine = "";
    } else {
        a_tag.style.textDecorationLine = "line-through";
    }
}