function preventClick(e){
	e.preventDefault();
}

// 데이터셋 lengthValue 의 길이가 0이 아니면 검색결과 태그를 가져와 결과 리스트에 보여준다.
function reveal_searchSection (length, my_tag, other_tag1, other_tag2, other_tag3, other_tag4) {
    if (Number(length) === 0) {
        return;
    }
    my_tag.style.display = "block";
    my_tag.style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;"

    other_tag1.style.display = "none";
    other_tag2.style.display = "none";
    other_tag3.style.display = "none";
    other_tag4.style.display = "none";
}

const select_container = document.getElementById("select_container");
const up_down_btn = document.getElementById("up_down_btn");

up_down_btn.addEventListener("click", function() {
    if (select_container.style.display === "none") {
        select_container.style.display = "block";
    } else {
        select_container.style.display = "none"
    }
    // length 값을 가지고 있는 검색결과 태그
    const result_list = document.getElementById("result_list");
    const carrot_list = document.getElementById("carrot_list");
    const secret_list = document.getElementById("secret_list");
    const info_list = document.getElementById("info_list");
    const getUser_list = document.getElementById("getUser_list");

    const search_result_list = document.getElementById("search_result_list");
    const search_carrot_list = document.getElementById("search_carrot_list");
    const search_secret_list = document.getElementById("search_secret_list");
    const search_info_list = document.getElementById("search_info_list");
    const search_getUser_list = document.getElementById("search_getUser_list");

    const result_filter_text = document.querySelector(".result-filter-text");
    const result_filter_num  = document.querySelector(".result-filter-num ");

    if (Number(carrot_list.dataset.lengthValue) === 0) {
        carrot_list.style.display = "none";
    } else {
        carrot_list.style.display = "block";
    }
    if (Number(secret_list.dataset.lengthValue) === 0) {
        secret_list.style.display = "none";
    } else {
        secret_list.style.display = "block";
    }
    if (Number(info_list.dataset.lengthValue) === 0) {
        info_list.style.display = "none";
    } else {
        info_list.style.display = "block";
    }
    if (Number(getUser_list.dataset.lengthValue) === 0) {
        getUser_list.style.display = "none";
    } else {
        getUser_list.style.display = "block";
    }

    // length, my_tag, other_tag1, other_tag2, other_tag3, other_tag4
    result_list.addEventListener("click", function() {
        reveal_searchSection(
            result_list.dataset.lengthValue, 
            search_result_list, 
            search_carrot_list, 
            search_secret_list, 
            search_info_list, 
            search_getUser_list
            );
        select_container.style.display = "none";
        result_filter_text.innerText = "전체";
        result_filter_num.innerText = ` (${result_list.dataset.lengthValue})`;
    });
    carrot_list.addEventListener("click", function() {
        reveal_searchSection(
            carrot_list.dataset.lengthValue, 
            search_carrot_list,
            search_result_list, 
            search_secret_list, 
            search_info_list, 
            search_getUser_list
        );
        select_container.style.display = "none";
        result_filter_text.innerText = "흙당근";
        result_filter_num.innerText = ` (${carrot_list.dataset.lengthValue})`;
    });
    secret_list.addEventListener("click", function() {
        reveal_searchSection(
            secret_list.dataset.lengthValue,
            search_secret_list,  
            search_result_list, 
            search_carrot_list, 
            search_info_list, 
            search_getUser_list
        );
        select_container.style.display = "none";
        result_filter_text.innerText = "익명게시판";
        result_filter_num.innerText = ` (${secret_list.dataset.lengthValue})`;
    });
    info_list.addEventListener("click", function() {
        reveal_searchSection(
            info_list.dataset.lengthValue,
            search_info_list, 
            search_result_list, 
            search_carrot_list, 
            search_secret_list,  
            search_getUser_list
        );
        select_container.style.display = "none";
        result_filter_text.innerText = "정보공유방";
        result_filter_num.innerText = ` (${info_list.dataset.lengthValue})`;
    });
    getUser_list.addEventListener("click", function() {
        reveal_searchSection(
            getUser_list.dataset.lengthValue, 
            search_getUser_list,
            search_result_list, 
            search_carrot_list, 
            search_secret_list, 
            search_info_list,
        );
        select_container.style.display = "none";
        result_filter_text.innerText = "사람구함";
        result_filter_num.innerText = ` (${getUser_list.dataset.lengthValue})`;
    });
});

