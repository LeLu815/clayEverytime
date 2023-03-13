
const contentLike_div = document.getElementById("contentLike_div");
const contentLikes = document.getElementById("contentLikes");
const isLiked = document.getElementById("isLiked");
const loggedIn_check_div = document.getElementById("loggedIn_check_div");
const my_isLoggedIn = loggedIn_check_div.dataset.is_logged_in;

contentLike_div.addEventListener("click", async function() {
    // 로그인이 안되었으면 fetch 기능 블락
    if (!my_isLoggedIn) {
        alert("로그인이 필요합니다.");
        return;
    } 

    const pathname = window.location.pathname
    const id = pathname.match(/[0-9a-f]{24}/)[0];
    if (!id) {
        return ;
    }

    const response = await fetch(`/api/content/${id}/likes`);
    const data = await response.json();

    // 백엔드에서 블락
    if (data.isLoggedIn === false) {
        alert("로그인이 필요합니다.");
        return;
    }

    if (data === null) {
        alert("삭제된 컨텐츠 입니다.");
        return;
    }
    // 백엔드에서 빼기

    if (data.type === "regular") {
        document.getElementById("isLiked").className  = "fa-regular fa-thumbs-up";
        const value = Number(data.counts) === 0 ? " 좋아요" : ` ${data.counts}`;
        contentLikes.innerText = value;
        return;
    }

    document.getElementById("isLiked").className = "fa-solid fa-thumbs-up";
    const value = Number(data.counts) === 0 ? " 좋아요" : ` ${data.counts}`;
    contentLikes.innerText = value;
    return;
});