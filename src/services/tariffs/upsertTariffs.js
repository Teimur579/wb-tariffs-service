import db from "../../db/db.js";

export const upsertTariffs = async (data) => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];

    const [dayEntry] = await db("tariffs_box_day")
        .insert({
            date: todayDate,
            dt_next_box: data.dtNextBox,
            dt_till_max: data.dtTillMax,
        })
        .onConflict("date")
        .merge()
        .returning("id");

    const dayId = dayEntry.id || dayEntry;

    const rows = data.warehouseList.map((w) => ({
        day_id: dayId,
        warehouse_name: w.warehouseName,
        box_delivery_and_storage_expr: w.boxDeliveryAndStorageExpr,
        box_delivery_base: w.boxDeliveryBase,
        box_delivery_liter: w.boxDeliveryLiter,
        box_storage_base: w.boxStorageBase === '-' ? null : w.boxStorageBase,
        box_storage_liter: w.boxStorageLiter === '-' ? null : w.boxStorageLiter,
    }));

    await db("tariffs_box_details")
        .insert(rows)
        .onConflict(["day_id", "warehouse_name"])
        .merge();
};