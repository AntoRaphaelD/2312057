const axios = require("axios");
const { Log } = require("../utils/logger"); 

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

const getNotifications = async (req, res) => {
    try {

        await Log(
            "backend",
            "info",
            "controller",
            "Fetching all notifications"
        );

        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        await Log(
            "backend",
            "info",
            "controller",
            "Notifications fetched successfully"
        );

        res.status(200).json(response.data);

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            `Failed to fetch notifications: ${error.message}`
        );

        res.status(500).json({
            message: "Failed to fetch notifications"
        });
    }
};

const getPriorityNotifications = async (req, res) => {
    try {

        const limit = Number(req.query.limit) || 10;

        await Log(
            "backend",
            "info",
            "controller",
            `Fetching top ${limit} priority notifications`
        );

        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        const notifications = response.data.notifications;

        const priority = {
            Placement: 3,
            Result: 2,
            Event: 1
        };

        const sorted = notifications.sort((a, b) => {

            if (priority[b.Type] !== priority[a.Type]) {
                return priority[b.Type] - priority[a.Type];
            }

            return new Date(b.Timestamp) - new Date(a.Timestamp);

        });

        await Log(
            "backend",
            "info",
            "controller",
            "Priority notifications fetched successfully"
        );

        res.status(200).json(sorted.slice(0, limit));

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            `Failed to fetch priority notifications: ${error.message}`
        );

        res.status(500).json({
            message: "Error fetching priority notifications"
        });
    }
};

module.exports = {
    getNotifications,
    getPriorityNotifications
};