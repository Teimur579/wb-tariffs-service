import cron from "node-cron";
import { fetchTariffs } from "../tariffs/fetchTariffs.js";
import { upsertTariffs } from "../tariffs/upsertTariffs.js";
import { exportToSheets } from "../sheets/exportToSheets.js";

const schedule = () => {
    cron.schedule("0 * * * *", async () => {
        try {
            console.log("[cron] Начало...");
            const data = await fetchTariffs();
            console.log("[cron] Обновление данных в бд...");
            await upsertTariffs(data);
            console.log("[cron] Экспортирование в таблицы...");
            await exportToSheets();
            console.log("[cron] Процессы завершены.");
        } catch (err) {
            console.error("[cron] Ошибка:", err);
        }
    });
};

export default schedule;