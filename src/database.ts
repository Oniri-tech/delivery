import { Model } from "objection";
import Knex from "knex";
import config from "./knexfile";

export const database = Knex(config);

Model.knex(database);

export class PizzaModel extends Model {
  id!: number;
  name!: string;
  description!: string;
  price!: number;

  static get tableName() {
    return "pizzas";
  }

  static get idColumn() {
    return "id";
  }
}
export class BurgerModel extends Model {
  id!: number;
  name!: string;
  description!: string;
  price!: number;

  static get tableName() {
    return "burgers";
  }

  static get idColumn() {
    return "id";
  }

  static get burgerPrice(){
    return "9.90";
  }
}

export class EnpanadasModel extends Model {
  id!: number;
  name!: string;
  description!: string;
  price!: number;

  static get tableName(){
    return "enpanadas";
  }
  static get idColumn() {
    return "id";
  }
}
