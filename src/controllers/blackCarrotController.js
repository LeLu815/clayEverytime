import Content from "../models/Content";
import User from "../models/User";

export const registerLikes = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return;
    }
    const content = await Content.findById(id);
    if (!Boolean(req.session)) {
        return res.status(401).json({
            isLoggedIn : false, 
            counts : content.meta.likes
        });
    }
    const {user:{_id}} = req.session;

    if (!content) {
        return res.status(404).end(null);
    }
    
    if (!content.likedUser.includes(_id)) {
        content.likedUser.push(_id);
        content.meta.likes = content.likedUser.length;
        await content.save();
        return res.json(content.meta.likes);
    }
    content.likedUser = content.likedUser.filter((element)=>String(element) !== String(_id));
    content.meta.likes = content.likedUser.length;
    await content.save();
    return res.json(content.meta.likes);
}

export const blackCarrot = async (req, res) => {
    const blackCarrotContents = await Content.find({contentType:1});
    return res.render("blackCarrot", {blackCarrotContents});
}

export const trending = async (req, res) => {
    const blackCarrotContents = await Content.find({contentType:1});
    const secretContents = await Content.find({contentType:2});
    const infoShareContents = await Content.find({contentType:3})

    return res.render("home", {
        pageTitle : "home", 
        blackCarrotContents, 
        secretContents,
        infoShareContents,
    })
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
    return res.render("upload", { pageTitle: "Upload Video"});
};

export const postUpload = async (req, res) => {
    // 이미지 삽입은 나중에 다시 구현
    const {
        user: {_id},
    } = req.session;
    const {
        body: {title, description, contentType},
        file,
     }= req;
    console.log(file);
    try { 
        const newContent = await Content.create({
            title,
            description,
            contentType,
            owner:_id,
            meta: {
                views : 0,
                likes: 0,
            },
            contentImage : file.path,
        });
        const user = await User.findById(_id);
        user.contents.push(newContent._id);
        await user.save();
        return res.redirect("/");
    } catch (error) {
        return res.render("upload", {
            errorMessage: error._message,
        });
    }
};

// 검색기능 구현해야함
export const search = (req, res) => res.send("Search");


export const deleteContent = (req, res) => {
  return res.send("Delete Video");
};