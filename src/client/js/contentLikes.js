
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
    console.log(data);
    if (data.isLoggedIn === false) {
        // console.log(data.counts, typeof data.counts, String(data.counts));
        contentLikes.innerText = data.counts;
        alert("로그인이 필요합니다.");
        return;
    } else if (data === null) {
        alert("삭제된 컨텐츠 입니다.");
        return;
    }
    if (Number(data) < Number(contentLikes.innerText)) {
        isLiked.className  = "fa-regular fa-thumbs-up";
        contentLikes.innerText = data;
        return;
    }
    isLiked.className = "fa-solid fa-thumbs-up";
    contentLikes.innerText = data;
    return;
});