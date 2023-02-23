const contentContainer = document.getElementById("contentContainer");
const commentForm = document.getElementById("comment__form");
const textarea = commentForm.querySelector("textarea");
const cancelCommentBtn = document.getElementById("cancelCommentBtn");
const addCommentBtn = document.getElementById("addCommentBtn");
const singleCommentEdit = document.querySelector(".singleComment__edit");
const singleCommentDelete = document.querySelector(".singleComment__delete");

// const deepCopy = require("lodash.clonedeep");


const handleDisabled = () => {
    if (textarea.value === "") {
        return addCommentBtn.disabled = true;
     } else {
        return addCommentBtn.disabled = false;
     }
}

const addNestedComment = document.querySelectorAll(".addNestedComment");
const contentCommentList =document.querySelectorAll(".contentComment");

const innerFunc = (event, data, a, contentId) => {

    const div = document.createElement("div");
    const form = document.createElement("form");
    const newTextarea = document.createElement("textarea");
    const cancelBtn = document.createElement("button");
    const addBtn = document.createElement("button");

    // div.classList.add("");
    cancelBtn.classList.add("cancelCommentBtn");
    addBtn.classList.add("addCommentBtn");
    cancelBtn.innerText = "취소";
    addBtn.innerText = "댓글";
    addBtn.setAttribute("type", "submit");
    
    addBtn.disabled = true;

    newTextarea.addEventListener("keyup", function(){
        if (newTextarea.value !== "") {
            addBtn.disabled = false;
        } else {
            addBtn.disabled = true;
        } 
    });

    cancelBtn.addEventListener("click", function(){
        div.remove();
        a.addEventListener("click", function(event) {
            innerFunc(event, data, a, contentId);
        }, { once : true });
        return;
    });

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        const text = event.target[0].value;
        if (text === "") {
            return;
        }
        const commentId = data;
        
        const response = await fetch(`/api/content/${commentId}/nestedComment`, {
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({text, contentId}),
        });

        const {nestedComment, createdAt, ownerName, nestedNum} = await response.json();

        const div_first = document.querySelectorAll(".see__more__nestedComment");

        const div_second = document.createElement("div");
        const div_third = document.createElement("div");
        const div_fourth = document.createElement("div");
        const div_fifth = document.createElement("div");

        const span_first = document.createElement("span");
        const span_second = document.createElement("span");
        const a = document.createElement("a");
;
        div_second.classList.add("nested__comment");
        div_third.innerText = ownerName;
        div_fourth.innerText = text;

        span_first.classList.add("contentCreatedAt");
        span_first.innerText = "방금";
        div_second.innerText = "좋아요";
        a.innerText = "삭제";
        a.href = `/content/secretLounge/nestedComment/${contentId}&${commentId}&${nestedComment}/delete`;

        div_fifth.append(span_first);
        div_fifth.append(span_second)
        div_fifth.append(a);

        div_second.append(div_third);
        div_second.append(div_fourth);
        div_second.append(div_fifth);
        
        for (let tag of div_first) {
            if (String(tag.dataset.seemore) === String(commentId)) {
                const div_second = document.createElement("div");
                const div_third = document.createElement("div");
                const div_fourth = document.createElement("div");
                const div_fifth = document.createElement("div");

                const span_first = document.createElement("span");
                const span_second = document.createElement("span");
                const a = document.createElement("a");
        ;
                div_second.classList.add("nested__comment");
                div_third.innerText = ownerName;
                div_fourth.innerText = text;

                span_first.classList.add("contentCreatedAt");
                span_first.innerText = "방금";
                div_second.innerText = "좋아요";
                a.innerText = "삭제";
                a.href = `/content/secretLounge/nestedComment/${contentId}&${commentId}${nestedComment}/delete`;

                div_fifth.append(span_first);
                div_fifth.append(span_second)
                div_fifth.append(a);
                // div_fifth.append(replyDiv);

                div_second.append(div_third);
                div_second.append(div_fourth);
                div_second.append(div_fifth);

                tag.style.display = "block";
                tag.appendChild(div_second);
            }
        }

        const nestedCommentCountTag = document.querySelectorAll(".see__more__nestedComment__btn");
        for (let tagg of nestedCommentCountTag) {
            if (String(tagg.dataset.seemore) === String(commentId)) {
                const intoText = String(tagg.innerText).split(" ");
                const commentCount = parseInt(intoText[2]) + 1;
                const completeText = `${intoText[0]} ${intoText[1]} ${commentCount}`;

                tagg.style.display = "block";
                const div_temper = document.createElement("div");
                div_temper.appendChild(div_second);
                tagg.after(div_temper);
                tagg.innerText = completeText;

                tagg.addEventListener("click", function() {
                    div_temper.remove();
                }, {once : true});
            }
        }

        newTextarea.value = "";
        cancelBtn.click()

        cancelBtn.addEventListener("click", function(){
            div.remove();
            a.addEventListener("click", function(event) {
                innerFunc(event, data, a, contentId);
            }, { once : true });
            return;
        });
    });

    form.appendChild(newTextarea);
    form.appendChild(cancelBtn);
    form.appendChild(addBtn);

    div.appendChild(form);

    const contentCommentList =document.querySelectorAll(".contentComment");
    for (let tag of contentCommentList) {
        if (String(tag.dataset.id) === String(data)) {
            return tag.appendChild(div);
        }
    }
    return alert("존재하지 않는 답글입니다.");
}

for ( let a of addNestedComment) {
    let data = a.dataset.addnestedcomment
    let contentId = a.dataset.commentid
    a.addEventListener("click", function(event) {
        innerFunc(event, data, a, contentId);
    }, { once : true });
}

const addComment = (text, commentId, userName, time, contentId) => {
    
    const div_first = document.createElement("div");
    const p_ownerName = document.createElement("p");
    const p_text = document.createElement("p");

    p_ownerName.innerText = ` ${userName}`;
    p_text.innerText = `${text}`;

    div_first.classList.add("contentComment");
    div_first.dataset.id = commentId;

    const div_second = document.createElement("div");
    const span_first = document.createElement("span");
    const span_second = document.createElement("span");
    const span_third = document.createElement("span");

    span_first.innerText = "방금";
    span_second.innerText = "좋아요 ";
    span_third.innerText = "답글";

    div_second.classList.add("commentInfo");
    span_first.classList.add("contentCreatedAt");
    // span_second.classList.add("");
    span_third.classList.add("addNestedComment");

    span_third.dataset.addnestedcomment = commentId;
    span_third.dataset.commentid = contentId;
    
    div_second.appendChild(span_first);
    div_second.appendChild(span_second);
    div_second.appendChild(span_third);

    const div_third = document.createElement("div");
    const span_fourth = document.createElement("span");
    const a_first = document.createElement("a");

    span_fourth.innerText = "수정";
    a_first.innerText = "삭제";

    a_first.href = `/content/secretLounge/comment/${contentId}&${commentId}/delete`;

    const replyDiv = document.createElement("div");
    replyDiv.classList.add("see__more__nestedComment__btn");
    replyDiv.style.display = "none";
    replyDiv.dataset.seemore = commentId;
    replyDiv.innerText = `▼ 답글 0`;

    const divCommentAttach = document.createElement("div");
    divCommentAttach.classList.add("see__more__nestedComment");
    divCommentAttach.dataset.seemore = commentId;
    divCommentAttach.style.display = "none";

    span_fourth.addEventListener("click", function() {
        const innerFunction = (span_fourth) => {
            const div__first = document.createElement("div");
            const input__first = document.createElement("input");
            const button__first = document.createElement("button");
            const button__second = document.createElement("button");
    
            button__first.innerText = "취소";
            button__second.innerText = "수정";
    
            input__first.value = text;

            button__second.disabled = true;

            input__first.addEventListener("keyup", function() {
                if (input__first.value === "") {
                    button__second.disabled = true;
                } else {
                    button__second.disabled = false;
                }
            })

            button__second.addEventListener("click", async function() {
                const myText = input__first.value;
                const response = await fetch(`/api/content/${commentId}/commentEdit`, {
                    method:"POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({text : myText, id : commentId}),
                });
        
                const finalText = await response.json() ;

                p_text.innerText = finalText.text;

            });

            div__first.appendChild(input__first);
            div__first.appendChild(button__first);
            div__first.appendChild(button__second);
    
            p_text.after(div__first); 

            button__first.addEventListener("click", function() {
                div__first.remove();
                span_fourth.addEventListener("click", function() {
                    innerFunction(span_fourth);
                }, {once :true});
            }, {once :true});
        }

        innerFunction(span_fourth);

        // 여기가 문제입니다
    }, {once : true});

    span_third.addEventListener("click", function(event) {
        innerFunc(event, commentId, span_third, contentId);
    }, { once : true });

    div_third.appendChild(span_fourth);
    div_third.appendChild(a_first);
    div_third.appendChild(replyDiv);
    div_third.after(divCommentAttach);

    const hr = document.createElement("hr");

    const comment__section = document.querySelector(".comment__section");
    
    div_first.appendChild(p_ownerName);
    div_first.appendChild(p_text);
    div_first.appendChild(div_second);
    div_first.appendChild(div_third);

    comment__section.prepend(hr);
    comment__section.prepend(div_first)

}

addCommentBtn.disabled = true;

const handleAddComment = async (event) => {
    event.preventDefault();
    const text = textarea.value;
    const contentId = contentContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/content/${contentId}/comment`, {
        method:"POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({text}),
    });
    
    const {newCommentId, userName, time} = await response.json();

    textarea.value = "";
    if (response.status === 201) {
        addComment(text, newCommentId, userName, time, contentId);
    }
}


textarea.addEventListener("keyup", handleDisabled);
commentForm.addEventListener("submit", handleAddComment);

const see__more__nestedComment = document.querySelectorAll(".see__more__nestedComment");
for (let seeMore of see__more__nestedComment) {
    seeMore.style.display = 'none';
}

const see__more__nestedComment__btn = document.querySelectorAll(".see__more__nestedComment__btn");
const see__more__nestedComment__btnInnerFunc = (event, data, edit) => {
    const see__more__nestedComment = document.querySelectorAll(".see__more__nestedComment");

    for (let seeMoreTag of see__more__nestedComment) {
        if (String(data) === String(seeMoreTag.dataset.seemore)) {
            if (seeMoreTag.style.display === 'none') {
                seeMoreTag.style.display = "block";
            } else {
                seeMoreTag.style.display = 'none';
            }
        }
    } 
}

for (let edit of see__more__nestedComment__btn) {
    let data = edit.dataset.seemore;
    edit.addEventListener("click", function(event){
        see__more__nestedComment__btnInnerFunc(event , data, edit);
    });
}


const commentEdit = document.querySelectorAll(".commentEdit");
const innerCommentEdit = (event, data, tag) => {
    const singleComment__text = document.querySelectorAll(".singleComment__text");
    for (let text of singleComment__text) {
        if (String(text.dataset.id) === String(data)) {
            const div = document.createElement("div");
            const input = document.createElement("input");
            const cancel = document.createElement("button");
            const edit = document.createElement("button");

            cancel.innerText = "취소";
            edit.innerText = "수정"
            edit.disabled = true;
            input.value = text.innerText;

            div.appendChild(input);
            div.appendChild(cancel);
            div.appendChild(edit);

            text.appendChild(div);

            cancel.addEventListener("click", function() {
                div.remove();
                tag.addEventListener("click", function(event) {
                    innerCommentEdit(event, data, tag);
                });
            }, { once : true });

            input.addEventListener("keyup", function() {
                if (input.value === "") {
                    edit.disabled = true;
                } else {
                    edit.disabled = false;
                }
            });

            edit.addEventListener("click", function() {
                fetch(`/api/content/${data}/commentEdit`, {
                    method:"POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({ 
                        text : input.value,
                        id : data,
                    }),
                })
                .then(res=>res.json())
                .then(res=>{
                    const newText = res.text;
                    text.innerText = newText;
                    div.remove();
                    tag.addEventListener("click", function(event) {
                        innerCommentEdit(event, data, tag);
                    }, {once : true});
                })
                .catch(err=>{
                    alert(err);
                })
            });
        }
    }
} 

for (let commentEditTag of commentEdit) {
    let data = commentEditTag.dataset.commentedit;
    commentEditTag.addEventListener("click", function(event) {    
        innerCommentEdit(event, data, commentEditTag);
    }, { once : true });
}