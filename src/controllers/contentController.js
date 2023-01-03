
const fakeUser = {
    username : "Leein",
    LoggedIn : true,
};

const testList = [
    "이인 최고",
    "홍성현 바보",
    "최승명 뉴욕 폭설 충격",
];

const topicList = [
    {
        "name" :'흙당근',
        "id" : 'blackCarrot',
        "mainList" : [
            "이인 최고",
            "홍성현 바보",
            "최승명 뉴욕 폭설 충격",
            "최승명 뉴욕 폭설 충격",
            "최승명 뉴욕 폭설 충격",
            "최승명 뉴욕 폭설 충격",
            "최승명 뉴욕 폭설 충격",
            "최승명 뉴욕 폭설 충격",
        ]
    },
    {
        "name" :'이인',
        "id" : 2,
        "mainList" : [
            "이인 최고",
            "홍성현 바보",
            "최승명 뉴욕 폭설 충격",
        ]
    },
    {
        "name" : '홍성현',
        "id" : 3,
        "mainList" : [
            "이인 최고",
            "홍성현 바보",
            "최승명 뉴욕 폭설 충격",
        ]
    },
    {
        "name" : '김유민',
        "id" : 4,
        "mainList" : [
            "이인 최고",
            "홍성현 바보",
            "최승명 뉴욕 폭설 충격",
        ]
    },
    {
        "name" : '최승명',
        "id" : 5,
        "mainList" : [
            "이인 최고",
            "홍성현 바보",
            "최승명 뉴욕 폭설 충격",
        ]
    },
];

export const blackCarrot = (req, res) => {
    console.log(topicList[0]);
    res.render("blackCarrot", {blackCarrot : topicList[0], fakeUser});
}

export const trending = (req, res) => res.render("home", {pageTitle : "home", fakeUser, testList, topicList});

export const see = (req, res) => {
  return res.send(`Watch Video #${req.params.id}`);
};

export const edit = (req, res) => {
  return res.send("Edit");
};

export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload");

export const deleteContent = (req, res) => {
  return res.send("Delete Video");
};