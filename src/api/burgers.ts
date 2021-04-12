import { Router } from "express";
import { BurgerModel } from "../database";

export const router = Router();

router.get("/", async (req, res) => {
    const burgers = await BurgerModel.query();  
    res.json(burgers);      
});

router.post("/", async (req, res) => {
    const { name } = req.body;
    const { price } = req.body;
    const burger = await BurgerModel.query()
    .insert({
        name,
        price
    })
    .returning("*");
    res.json(burger);
})