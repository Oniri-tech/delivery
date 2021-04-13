import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("enpanadas", (table) => {
        table.increments("id").unique().primary().notNullable();
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.integer("price").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("enpanadas");
}

