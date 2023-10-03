import express from 'express'
import ProductManager from "../src/ProductManager.js";
import { productsRouter } from "../src/routes/products.router.js"
import { cartsRouter } from './routes/carts.router.js';

const app = express();

const productManager = new ProductManager();

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

//endpoint de prueba
app.get('/prueba', (req, res) => {


    const htmlBienvenida = '<html><body><h1 style="color: blue;">¡Bienvenido al sitio!</h1></body></html>';

    res.send(htmlBienvenida);

});

app.listen('8080', () => {

    console.log('servidor activo en puerto 8080');

}); 
