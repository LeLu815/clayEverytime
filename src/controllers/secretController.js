import Content from "../models/Content";

const fakeUser = {
    username : "Leein",
    LoggedIn : false,
};

export const secretLounge = async (req, res) => {
    const secretContents = await Content.find({contentType:2});
    // console.log(secretContents);
    return res.render("secretLounge", {fakeUser, secretContents});
}

export const secretLoungeContent = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    console.log(req.params);
    const content = await Content.findById(id);
    
    return res.render("secretLoungeContent", {fakeUser, content});
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const content = await Content.findById(id);

    return res.render("editContent", {content, fakeUser});
}

export const postEdit = async (req, res) => {
    const {id} = req.params;
    const {title, description, contentType} = req.body;
    const content = await Content.exists({_id:id});
    if(!content) {
        return res.render("404", {pageTitle:"Content not found."});
    }
    await Content.findByIdAndUpdate(id, {
        title,
        description,
        contentType
    });

    return res.redirect(`/secretLounge/${id}`);
}

export const deleteSecretContent = async (req, res) => {
    const { id } = req.params;
    await Content.findByIdAndDelete(id);
    return res.redirect("/");
}