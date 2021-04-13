import { Router } from "express";
import * as pizzas from "./pizzas";
import * as burgers from "./burgers";
import * as enpanadas from "./enpanadas";

export const router = Router();

router.use("/pizzas", pizzas.router);
router.use("/burgers", burgers.router);
router.use("/enpanadas", enpanadas.router);
