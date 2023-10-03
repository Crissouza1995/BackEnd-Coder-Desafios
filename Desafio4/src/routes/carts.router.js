import { Router } from "express";

import CartManager from "../cartManager.js";

// Crea una instancia de la clase ProductManager
const cartManager = new CartManager();

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    // uso mi metodo addproduct para agregar el producto al array de products
    const newCart = await cartManager.addCart();
    // Retorno 201 con el objeto creado y agregado
    res.status(201).send(newCart);
  } catch (err) {
    //Retorno error
    res.status(400).send({ err });
  }
});

// Defino la ruta para los productos dentro de un carrito
cartsRouter.get("/:cid", async (req, res) => {
  try {
    // Obtengo el id para buscar dentro del carrito solicitado
    const idFilter = await cartManager.getCartById(parseInt(req.params.cid));
    res.status(201).send(idFilter);
  } catch (err) {
    // si hay un error lo envio
    res.status(400).send({ err });
  }
});

// Defino la ruta POST para agregar un nuevo carrito
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const add = await cartManager.addToCart(req.params.cid, req.params.pid);
    res.status(201).send(add);
  } catch (err) {
    res.status(400).send({ err });
  }
});


export { cartsRouter };