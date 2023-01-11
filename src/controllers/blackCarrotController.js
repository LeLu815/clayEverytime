import Content from "../models/Content";

const fakeUser = {
    username : "Leein",
    LoggedIn : false,
};



export const blackCarrot = async (req, res) => {
    const blackCarrotContents = await Content.find({contentType:1});  
    console.log(blackCarrotContents);
    return res.render("blackCarrot", { fakeUser, blackCarrotContents});
}

export const trending = async (req, res) => {
    const blackCarrotContents = await Content.find({contentType:1});
    const secretContents = await Content.find({contentType:2});
    const infoShareContents = await Content.find({contentType:3})

    return res.render("home", {
        pageTitle : "home", 
        fakeUser, 
        blackCarrotContents, 
        secretContents,
        infoShareContents,
    })
};

export const see = (req, res) => {
  return res.send(`Watch Video #${req.params.id}`);
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    // const video = videos[id - 1];
    // return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    // videos[id - 1].title = title;
    // return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" , fakeUser});
};

export const postUpload = async (req, res) => {
    // 이미지 삽입은 나중에 다시 구현
    const {title, description, image, contentType} = req.body;
    try { await Content.create({
            title,
            description,
            contentType,
            meta: {
                views : 0,
                likes: 0,
            },
        });
        return res.redirect("/");
    } catch (error) {
        return res.render("upload", {
            fakeUser, 
            errorMessage: error._message,
        });
    }
};

export const search = (req, res) => res.send("Search");


export const deleteContent = (req, res) => {
  return res.send("Delete Video");
};