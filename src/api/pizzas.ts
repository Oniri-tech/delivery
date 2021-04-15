import { Router } from "express";
import { PizzaModel } from "../database";

export const router = Router();

router.get("/", async (req, res) => {
  const pizzas = await PizzaModel.query();
  res.json(pizzas);
});

router.get("/:id", async (req, res) => {
  const pizza = await PizzaModel.query().where("id", req.params.id).first();
  res.json(pizza);
})

router.post("/", async (req, res) => {
  const { name } = req.body;
  const { description } = req.body;
  const { price } = req.body;
  
  if (typeof name != "string" || typeof description != "string" || typeof price != "number" ) {
    res.status(500);
}
  try {
    const pizza = await PizzaModel.query()
    .insert({
      name,
      description,
      price
    })
    .returning("*");
    res.json(pizza);  
  } catch (error) {
    res.status(500).json({error: error.message});
  }

});

router.put("/:id", async (req, res) => {
  try {
      const pizza = await PizzaModel.query()
      .where("id", req.params.id)
      .update({
          name : req.body.name,
          description : req.body.description,
          price : req.body.price,
      })
      .returning("*");
      res.json(pizza);
  } catch (error) {
      res.status(500).json({error: error.message});
  };
});

router.delete("/:id", async (req, res) => {
  const pizza = await PizzaModel.query()
  .where("id", req.params.id).del();
  res.json(pizza);
})