import { Router } from "express";
import { EnpanadasModel } from "../database";

export const router = Router();

router.get("/", async (req, res) => {
    const enpanadas = await EnpanadasModel.query();
    res.json(enpanadas);
});

router.get("/:id", async (req, res) => {
    const enpanadas = await EnpanadasModel.query().where('id', req.params.id).first();
    res.json(enpanadas);
})

router.post("/", async (req, res) => {
    const { name } = req.body;
    const { description } = req.body;
    const { price } = req.body;
    const enpanadas = await EnpanadasModel.query()
    .insert({
        name,
        description,
        price
    })
    .returning("*");
    res.json(enpanadas);
});

router.delete("/:id", async (req, res) => {
    const enpanadas = await EnpanadasModel.query()
    .where("id", req.params.id).del();
    res.json(enpanadas);
})