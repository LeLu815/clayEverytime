
const contentLikes = document.getElementById("contentLikes");
const isLiked = document.getElementById("isLiked");

contentLikes.addEventListener("click", async function() {
    const pathname = window.location.pathname
    const id = pathname.match(/[0-9a-f]{24}/)[0];
    if (!id) {
        return;
    }
    const response = await fetch(`/api/content/${id}/likes`);
    const data = await response.json();
    console.log(data, Number(contentLikes.innerText));
    if (Number(data) < Number(contentLikes.innerText)) {
        console.log("싫어요");
        isLiked.className  = "fa-regular fa-thumbs-up";
        contentLikes.innerText = data;
        return;
    }
    console.log("좋아요");
    isLiked.className = "fa-solid fa-thumbs-up";
    contentLikes.innerText = data;
    return;
});