
//se entrega desafio Martes 24/09

//const fs = require('fs').promises; //llamo a libreria FS

import fs from "fs";

class ProductManager {

    constructor() {
        this.productId = 1;
        this.products = [];
        this.path = './products.json';

    }

    generadorId() {
        return this.products.length + 1; // Agregue un id por cada producto, que es la longitud del array + 1.
    }

    async addProduct(title, description, price, thumbnail, code, stock, id) {
      /*  let productInSystem = this.products.some((element) => element.code === code);
        if (productInSystem != true) {
            const newProduct = {
                id: this.productId++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(newProduct);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } else {
            console.error("The code of the product is already in our system");
        }*/
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            const productsObjeto = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            return productsObjeto;
        } else {
            console.error("The file does not exist");
        }
    }

    async getProductsById(id) {
        const productsObject = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        let productInSystem = productsObject.some((element) => element.id === id);
        if (productInSystem) {
            let productSearched = productsObject.find((product) => product.id === id);
            return productSearched;
        } else {
            console.error("The product was not found");
        }

    }

    updateProduct(id, dataToUpdate) {
        const productsObject = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        let productInSystem = productsObject.some((element) => element.id === id);
        if (productInSystem) {
            const productoActualizado = {
                id: id,
                ...dataToUpdate
            };
            const ubication = productsObject.findIndex((element) => element.id === id);
            productsObject[ubication] = productoActualizado;
            fs.writeFileSync(this.path, JSON.stringify(productsObject));
            console.log("The product information was updated");
        } else {
            console.error("The product was not found");
        }
    }

    async deleteProducts(id) {
        let productInSystem = JSON.parse(fs.readFileSync(this.path, "utf-8")).filter((element) => element.id !== id);
        console.log(productInSystem)
        if (productInSystem) {
            fs.unlinkSync(this.path);
            fs.writeFileSync(this.path, JSON.stringify(productInSystem, null, 2));
            console.log("The product was deleted");
        } else {
            console.error("The product was not found");
        }

    }

}

const productManager = new ProductManager();

productManager.addProduct(
    "manzana",
    "manzana verde de Paraguay",
    340,
    "www.imagen.com.ar",
    "A1",
    10
);
productManager.addProduct(
    "Frutilla",
    "Frutilla super dulce",
    1500,
    "www.frutillaroja.com.ar",
    "A2",
    60
);
productManager.addProduct(
    "Pera",
    "Pera verde dulce",
    1500,
    "www.en la pera.com.ar",
    "A3",
    70
)
productManager.addProduct(
    "Sandia",
    "Sandia grande",
    1500,
    "www.sandiamo.com.ar",
    "A4",
    70
)

export default ProductManager;