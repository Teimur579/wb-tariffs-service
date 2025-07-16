import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import env from "../../config/env.js";
import db from "../../db/db.js";

export const exportToSheets = async () => {
    const sheetId = env.SPREADSHEET_ID;

    const auth = new JWT({
        email: env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        key: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(sheetId, auth);
    await doc.loadInfo();
    const latest = await db("tariffs_box_day").orderBy("date", "desc").first();
    
    if (!latest) return;
    
    const date = latest.date.toISOString().split("T")[0];
    const now = new Date().toISOString();
    const title = `stocks_coef_${date}`;

    const rawData = await db("tariffs_box_details")
        .where("day_id", latest.id)
        .orderByRaw("CAST(box_delivery_and_storage_expr AS FLOAT) ASC");

    const data = rawData.map(row => ({
        date,
        date_and_time: now,
        ...row
    }));
    
    let sheet = doc.sheetsByTitle[title];

    const headers = [
        "date",
        "date_and_time",
        "box_delivery_and_storage_expr",
        "box_delivery_base",
        "box_delivery_liter",
        "box_storage_base",
        "box_storage_liter",
        "warehouse_name",
    ];

    if (!sheet) {
        sheet = await doc.addSheet({
            title,
            headerValues: headers,
        });
    } else {
        await sheet.clearRows();
        await sheet.setHeaderRow(headers); 
    }

    await sheet.addRows(data);
};
