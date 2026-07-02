const axios = require("axios");

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

const getNotifications = async (req, res) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(
            {message: "Failed to fetch notifications"}
        );
    }
};
const getPriorityNotifications = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        const notifications = response.data.notifications;

        const priority = { Placement: 3, Result: 2, Event: 1};

        const sorted = notifications.sort((a, b) => {
            if (priority[b.Type] !== priority[a.Type]) {
                return priority[b.Type] - priority[a.Type];
            }
            return new Date(b.Timestamp) - new Date(a.Timestamp);
        });
        res.json(sorted.slice(0, limit));
    } catch (error) {
        res.status(500).json(
            {message: "Error fetching priority notifications"}
        );
    }
};

module.exports = {
    getNotifications,
    getPriorityNotifications
};