import { Router } from "express";
import { BurgerModel } from "../database";

export const router = Router();

router.get("/", async (req, res) => {
    const burgers = await BurgerModel.query();  
    res.json(burgers);      
});

router.get("/:id", async (req, res) => {
    const burger = await BurgerModel.query().where("id", req.params.id).first();
    res.json(burger);
})

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