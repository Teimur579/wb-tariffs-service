import express from "express";
import env from "./config/env.js";
import schedule from "./services/scheduler/cron.js";
import db from "./db/db.js";

const app = express();
const PORT = env.PORT || 3000;

schedule();

app.listen(PORT, async () => {
    try {
        await db.raw("SELECT 1");
        console.log("Успешное подключение к базе данных!");
    } catch (err) {
        console.error("Ошибка подключения к базе данных:", err.message);
        process.exit(1);
    }

    console.log(`Сервер запущен: http://localhost:${PORT}`);
});