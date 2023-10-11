import { Router } from "express";


const realTimeProducts = Router();


realTimeProducts.get("/", (req, res) => {

  res.render("realTimeProducts");
});

// Exportamos el router
export { realTimeProducts };