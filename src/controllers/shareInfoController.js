import Content from "../models/Content";
import CalenderInfo from "../models/CalenderInfo";
import User from "../models/User";
import KilnInfo from "../models/KilnInfo";

export const shareInfoLounge = async (req, res) => {
    const shareInfoContents = await Content.find({contentType:3}).populate("owner");
    return res.render("shareInfoLounge", {shareInfoContents});
}