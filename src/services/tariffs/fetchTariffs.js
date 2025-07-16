import axios from "axios";
import env from "../../config/env.js";

export const fetchTariffs = async () => {
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0]; 

        const response = await axios.get(env.WB_API_URL + `?date=${formattedDate}`, {
            headers: { "Authorization": env.WB_API_KEY }
        });

        if (response.data && response.data.response && response.data.response.data) {
            return response.data.response.data; 
        }

        throw new Error("Неверный ответ от WB API");
    } catch (error) {
        console.error("Ошибка при получении данных:", error.message);
        throw error;
    }
};