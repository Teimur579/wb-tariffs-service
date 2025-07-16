/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("tariffs_box_day", table => {
            table.increments("id");
            table.date("date").unique().notNullable();
            table.string("dt_next_box");
            table.string("dt_till_max");
        })
        .createTable("tariffs_box_details", table => {
            table.increments("id");
            table.integer("day_id").unsigned().notNullable()
                .references("id").inTable("tariffs_box_day").onDelete("CASCADE");
            table.string("box_delivery_and_storage_expr");
            table.string("box_delivery_base");
            table.string("box_delivery_liter");
            table.string("box_storage_base");
            table.string("box_storage_liter");
            table.string("warehouse_name").notNullable();

            table.unique(["day_id", "warehouse_name"]);
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema
        .dropTable('tariffs_box_details')
        .dropTable('tariffs_box_day');
}