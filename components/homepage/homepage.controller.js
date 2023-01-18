const api = require("../../lib/axios");
const client = require("../../lib/redis");

exports.homepage = async (req, res) => {
    try {
        const userRes = await client.get("user");
        const user = JSON.parse(userRes);

        const division = await api.get("/division/" + user.division_id);
        const latestNews = await api.get("/news/latest?approval_status=4");
        const allNews = await api.get("/news/all?approval_status=4&sort[created]=desc");
        const latestAnnouncement = await api.get("/announcement/latest?approval_status=4");
        const announcementPopUp = await api.get("/announcement/get-popup?approval_status=4");
        const allAnnouncement = await api.get("/announcement/all?approval_status=4&sort[created]=desc");
        const allEvent = await api.get("/event/all?approval_status=4&sort[created]=desc");
        
        const response = {
            "status" : 200,
            "message" : "Get homepage data successfully!",
            "data" : {
                "division" : division.data.data,
                "latestNews" : latestNews.data.data,
                "newsSlice" : allNews.data.data.slice(0, 5),
                "latestAnnouncement" : latestAnnouncement.data.data,
                "announcementPopUp" : announcementPopUp.data.data,
                "announcementSlice" : allAnnouncement.data.data.slice(0, 3),
                "eventSlice" : allEvent.data.data.slice(0, 3)
            }
        }

        res.status(200).send(response);
    } catch (error) {
        error?.response?.status
            ? res.status(error?.response?.status).send(error.message)
            : res.status(400).send(error.message);
    }
};
