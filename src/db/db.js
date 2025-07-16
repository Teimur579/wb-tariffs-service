import knex from "knex";
import knexfile from "./knexfile.cjs";

export default knex(knexfile.development);