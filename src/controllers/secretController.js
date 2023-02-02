import Content from "../models/Content";

export const secretLounge = async (req, res) => {
    const secretContents = await Content.find({contentType:2});
    // console.log(secretContents);
    return res.render("secretLounge", {secretContents});
}

export const secretLoungeContent = async (req, res) => {
    // 컨텐츠 아이디를 받아서 해당 컨텐츠를 불러올 때 owner 부분이 user의 objectId로 저장되어 있던 부분을 user 객체로 변환시켜준다.
    const {id} = req.params;
    const content = await Content.findById(id).populate("owner");
    return res.render("secretLoungeContent", {content});
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const content = await Content.findById(id);
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
    await Content.findByIdAndDelete(id);
    return res.redirect("/");
}