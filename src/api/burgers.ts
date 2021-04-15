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
});

router.post("/", async (req, res) => {
    const { name } = req.body;
    const { description } = req.body;
    const { price } = req.body;

    if (typeof name != "string" || typeof description != "string" || typeof price != "number" ) {
        res.status(500);
    }
    try {
        const burger = await BurgerModel.query()
        .insert({
            name,
            description,
            price
        })
        .returning("*");
        res.json(burger);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

})

router.put("/:id", async (req, res) => {
    try {
        const burger = await BurgerModel.query()
        .where("id", req.params.id)
        .update({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
        })
        .returning("*");
        res.json(burger);
    } catch (error) {
        res.status(500).json({error: error.message});
    };
});

router.delete("/:id", async (req, res) => {
    const burger = await BurgerModel.query().where("id", req.params.id).del();
    res.json(burger);
})