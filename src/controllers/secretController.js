import Content from "../models/Content";
import User from "../models/User";

export const secretLounge = async (req, res) => {
    const secretContents = await Content.find({contentType:2}).populate("owner");
    // console.log(secretContents);
    return res.render("secretLounge", {secretContents});
}

export const secretLoungeContent = async (req, res) => {
    // 컨텐츠 아이디를 받아서 해당 컨텐츠를 불러올 때 owner 부분이 user의 objectId로 저장되어 있던 부분을 user 객체로 변환시켜준다.
    const {id} = req.params;
    const content = await Content.findById(id).populate("owner");

    if (!res.locals.loggedIn) {
        return res.render("secretLoungeContent", {content, Likes : "regular"});
    }
    const {user:{_id}} = req.session;
    if (!content.likedUser.includes(_id)) {
        return res.render("secretLoungeContent", {content, Likes : "regular"});
    }
    return res.render("secretLoungeContent", {content, Likes : "solid"});
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const {user:{_id}} = req.session;
    const content = await Content.findById(id);
    if (!content) {
        return res.status(404).render("404", {pageTitle: "존재하지 않는 게시글입니다."})
    }
    if(String(content.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("editContent", {content});
}

export const postEdit = async (req, res) => {
    const {id} = req.params;
    const {
        body :{title, description, contentType},
        file,
    } = req;
    const content = await Content.exists({_id:id});
    if(!content) {
        return res.render("404", {pageTitle:"Content not found."});
    }
    await Content.findByIdAndUpdate(id, {
        title,
        description,
        contentType,
        image : file ? file : "",
    });

    return res.redirect(`/content/secretLounge/${id}`);
}

export const deleteSecretContent = async (req, res) => {
    const { id } = req.params;
    const {user:{_id}} = req.session;
    const user = await User.findById(_id);
    const content = await Content.findById(id);
    if(String(content.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Content.findByIdAndDelete(id);
    user.contents = user.contents.filter((element)=> String(element) !== String(id));
    await user.save();
    return res.redirect("/");
}