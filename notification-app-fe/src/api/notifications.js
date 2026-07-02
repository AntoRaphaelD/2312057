import axios from "axios";

const API_URL = "http://localhost:3000/notifications";

export async function fetchNotifications() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}