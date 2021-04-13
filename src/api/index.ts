import { Router } from "express";
import * as pizzas from "./pizzas";
import * as burgers from "./burgers";
<<<<<<< HEAD
=======
import * as enpanadas from "./enpanadas";
>>>>>>> dev

export const router = Router();

router.use("/pizzas", pizzas.router);
router.use("/burgers", burgers.router);
<<<<<<< HEAD
=======
router.use("/enpanadas", enpanadas.router);
>>>>>>> dev
