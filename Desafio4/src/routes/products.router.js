import { Router } from "express";

import ProductManager from "../ProductManager.js";

// Creamos una instancia de la clase ProductManager
const productManager = new ProductManager();

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {

    try {
        // Me guardo en una variable limit el querry
        let limit = req.query.limit;
        let allProducts = await productManager.getProducts();
        if (limit === undefined) {
            res.status(201).send(allProducts);
        } else {
            // envio la respuesta con el limite asignado
            let limitProducts = [];
            for (let i = 0; i < parseInt(limit); i++) {
                limitProducts.push(allProducts[i]);
            }
            res.status(201).send(limitProducts);
        }
    } catch (err) {
        // si hay un error lo envio
        res.status(400).send({ err });
    }
});

// Defino la ruta para ver productos por id
productsRouter.get("/:pid", async (req, res) => {
    try {
        // obtengo el producto filtrado por id y parseado para que sea numero
        let idFilter = await productManager.getProductsById(
            parseInt(req.params.pid)
        );
        res.status(201).send(idFilter);
    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        // uso mi metodo addproduct para agregar el producto al array de products
        const newProduct = await productManager.addProduct(req.body);
        // Retorno 201 con el objeto creado y agregado
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(400).send({ err });
    }
});

// Defino la ruta PUT para actualizar un producto
productsRouter.put("/:pid", async (req, res) => {
    try {
        const updateProduct = await productManager.updateProduct(
            parseInt(req.params.pid),
            req.body
        );
        res.status(201).send(updateProduct);
    } catch (err) {
        res.status(400).send({ err });
    }
});

// Defino la ruta DELETE para eliminar un producto
productsRouter.delete("/:pid", async (req, res) => {
    try {
        const deleteProduct = await productManager.deleteProducts(
            parseInt(req.params.pid)
        );
        res.status(201).send(deleteProduct);
    } catch (err) {
        res.status(400).send({ err });
    }
});

export { productsRouter };