import { Router } from "express";
import * as pizzas from "./pizzas";
import * as burgers from "./burgers";

export const router = Router();

router.use("/pizzas", pizzas.router);
router.use("/burgers", burgers.router);
