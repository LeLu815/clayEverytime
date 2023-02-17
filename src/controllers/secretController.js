import Content from "../models/Content";
import User from "../models/User";
import Comment from "../models/Comment";
import NestedComment from "../models/NestedCOmment";

export const createNestedComment = async (req, res) => {
    const {
        session : {user : {_id}},
        params : {id},
        body : {text, contentId},
    } = req;

    const comment = await Comment.findById(id);
    const user = await User.findById(_id);
    const content = await Content.findById(contentId);
    if (!comment || !user || !content) {
        return res.sendStatus(404);
    }

    try {
        const nestedComment = await NestedComment.create({
            text,
            owner : _id,
            ownerName : user.name,
            comment : id,
            content : content._id,
        });

        comment.nestedComment.push(nestedComment._id);
        comment.save();

        res.status(201).json({
            nestedComment : nestedComment._id,
            createdAt : nestedComment.createdAt.getTime(),
            ownerName : user.name,
            nestedNum : comment.nestedComment.length,
        });
    } catch(error) {
        console.log(error);
        return res.sendStatus(404);
    }
}

export const commentEdit = async (req, res) => {
    const {
        body :{text, id},
        session : {user : {_id}},
    } = req;
    const comment = await Comment.findById(id);
    if (!comment) {
        return res.sendStatus(404);
    }
    if (String(comment.owner) !== String(_id)) {
        return res.sendStatus(403);
    }
    try {
        comment.text = text;
        console.log("받은 텍스트 :", text);
        await comment.save();
        return res.status(200).json({
            text,
        })
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createComment = async (req, res) => {
    const {
        session : {user : {_id}},
        params : {id},
        body : {text},
    } = req;

    const content = await Content.findById(id);
    const user = await User.findById(_id);

    if (!content) {
        return res.sendStatus(404);
    }
    try {
        const comment = await Comment.create({
            text,
            owner : _id,
            content : id,
            ownerName: user.name,
        });
        content.comment.push(comment._id);
        user.comment.push(comment._id);
        content.save();
        user.save();
        return res.status(201).json({
            newCommentId : comment._id, 
            userName : user.name, 
            time : comment.createdAt.getTime(),

        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(404);
    }
    
}

export const secretLounge = async (req, res) => {
    const secretContents = await Content.find({contentType:2}).populate("owner");
    return res.render("secretLounge", {secretContents});
}

export const secretLoungeContent = async (req, res) => {
    // 컨텐츠 아이디를 받아서 해당 컨텐츠를 불러올 때 owner 부분이 user의 objectId로 저장되어 있던 부분을 user 객체로 변환시켜준다.
    const {id} = req.params;
    const content = await Content.findById(id).populate("owner").populate("comment");
    const comment = await Comment.find({content : id}).populate("nestedComment");

    if (!res.locals.loggedIn) {
        return res.render("secretLoungeContent", {content, comment, Likes : "regular"});
    }
    const {user:{_id}} = req.session;;
    if (!content.likedUser.includes(_id)) {
        return res.render("secretLoungeContent", {content, comment, Likes : "regular"});
    }
    return res.render("secretLoungeContent", {content, comment, Likes : "solid"});
}


export const getSecretLoungeCommentEdit = async (req, res) => {
    const {id} = req.params;
    const comment = await Comment.findById(id).populate("nestedComment");
    res.render("editComment", {comment});
}

export const postSecretLoungeCommentEdit = async (req, res) => {
    const {
        params :{id},
        // body:{}
    } = req;
    // console.log(req.body);
    return res.end();
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
    await Comment.deleteMany({content : content._id});
    await NestedComment.deleteMany({content : content._id});

    await Content.findByIdAndDelete(id);
    user.contents = user.contents.filter((element)=> String(element) !== String(id));
    await user.save();
    return res.redirect("/");
}

export const deleteSecretComment = async (req, res) => {
    const {id} = req.params;
    const [contentId, commentId] = id.split("&");
    const {user:{_id}} = req.session;

    const user = await User.findById(_id);
    const content = await Content.findById(contentId);
    const comment = await Comment.findById(commentId);

    console.log(contentId);
    console.log(commentId);
    console.log("content :",content);
    console.log("comment :",comment);

    if (!user || !content) {
        console.log("유저 또는 컨텐츠 오류");
        return res.status(403).redirect(`/content/secretLounge/${contentId}`);
    }
    if(String(comment.owner) !== String(_id)) {
        console.log("코멘트 삭제 권한 없음 : 작성자 본인 아님");
        return res.status(403).redirect(`/content/secretLounge/${contentId}`);
    }
    
    try {
        user.comment = user.comment.filter((element)=> String(element) !== String(commentId));
        content.comment = content.comment.filter((element)=> String(element) !== String(commentId));

        await NestedComment.deleteMany({comment: commentId});
        await Comment.findByIdAndDelete(commentId);

        await user.save();
        await content.save();
        return res.redirect(`/content/secretLounge/${contentId}`);
    } catch (error) {
        console.log(error);
        return res.status(404).redirect(`/content/secretLounge/${contentId}`);
    }
}

export const deleteSecretNestedComment = async (req, res) => {
    const {user:{_id}} = req.session;
    const {id} = req.params;
    const [contentId, commentId, nestedCommentId] = id.split("&");

    const comment = await Comment.findById(commentId);
    const nestedComment = await NestedComment.findById(nestedCommentId);

    if (!comment) {
        return res.status(404).redirect(`/content/secretLounge/${contentId}`);
    }
    if (String(_id) !== String(nestedComment.owner)) {
        return res.status(403).redirect(`/content/secretLounge/${contentId}`);
    }

    try {
        comment.nestedComment = comment.nestedComment.filter((element)=> String(element) !== String(nestedCommentId));
        await comment.save();
        await NestedComment.findByIdAndDelete(nestedCommentId);

        return res.redirect(`/content/secretLounge/${contentId}`);
    } catch (error) {
        console.log(error);
        return res.status(404).redirect(`/content/secretLounge/${contentId}`);
    }   
}