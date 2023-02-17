const contentsSectionBtn = document.getElementById("contentsSectionBtn");
const commentsSectionBtn = document.getElementById("commentsSectionBtn");
const contentsSection = document.getElementById("contentsSection");
const commentsSection = document.getElementById("commentsSection");

let contentBoolean = false;
let commentBoolean = false;

contentsSectionBtn.addEventListener("click", function() {
    if (!commentBoolean) {
        if (contentBoolean) {
            contentsSection.style.display = "none";
            commentsSectionBtn.disabled = false; 
            contentBoolean = false;
        } else {
            contentsSection.style.display = "block";
            commentsSectionBtn.disabled = true; 
            contentBoolean = true;
        }
    }
});

commentsSectionBtn.addEventListener("click", function() {
    if (!contentBoolean) {
        if (commentBoolean) {
            commentsSection.style.display = "none";
            commentBoolean = false;
            contentsSectionBtn.disabled = false;
            
        } else {
            commentsSection.style.display = "block";
            commentBoolean = true;
            contentsSectionBtn.disabled = true;
        }
    }
});

