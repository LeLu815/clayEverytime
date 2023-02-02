
const contentLikes = document.getElementById("contentLikes");

contentLikes.addEventListener("click", async function() {
    const pathname = window.location.pathname
    const id = pathname.match(/[0-9a-f]{24}/)[0];
    const response = await fetch(`/api/content/${id}/likes`);
    const data = await response.json();
    console.log(data);
    contentLikes.innerText = data
});