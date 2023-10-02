//se entrega desafio Martes 24/09

// Consigna: Desarrollar un sv basado en express donde pódamos hacer consulta a nuestro archivo de productos.
// Aspectos a incluir:  * Se debera utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos
//                      * Desarrollar un sv express que, en su archivo app.js importe el archivo de ProductManager que actualmente tenemos.
//                      * El sv debe contar con lo siguientes endpoint:
//                              1- ruta '/products', la cual debe leer el archivo de productos y devolverlos dentro de un obj. agregar el soporte para recibir por 
//                                  query param el valor ?limit= el cual recibira ul limite de resultado.
//                              2- Si no se recibe query de limite, se devolveran todos los productos
//                              3- Si se recibe un limite. solo devolver el numero de productos solicitados.
//                              4- Ruta '/Products/:pid' la cual debe recibir por req.params el pid (product Id), y devolver solo produicto solicitado, en lugar de todos los 
//                                 productos.
import express from 'express'
import ProductManager from "./ProductManager.js";

const app = express();

const productManager = new ProductManager();

app.get('/products', async (req, res) => {
    try {
        let quantity = req.query.limit;
        let listOfProducts = await productManager.getProducts();
        if (quantity) {
            const limitedProducts = listOfProducts.slice(0, parseInt(quantity));
            return res.send(limitedProducts);
        } else {
            return res.send({ listOfProducts });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error al obtener la lista de productos' });
    }
});

app.get("/products/:pid", async (req, res) => {

    let productID = parseInt(req.params.pid);
    let listOfProducts = await productManager.getProductsById(productID);
    if (listOfProducts) {
        return res.send({ listOfProducts });
    } else {
        return res.send({ error: "Product not found" })
    }
});

app.get('/', (req, res) => {// lleva 2 parametros. 1: Ruta, 2: callbck (logica que quiero que el sv me devuelva)


    const htmlBienvenida = '<html><body><h1 style="color: blue;">¡Bienvenido al sitio!</h1></body></html>';

    res.send(htmlBienvenida);

});

app.listen('8080', () => {

    console.log('servidor activo en puerto 8080');

}); 
