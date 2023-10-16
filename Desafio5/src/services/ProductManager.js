import fs from 'fs';
class ProductManager {
    constructor() {
        this.productId = 1;
        this.products = [];
        this.path = "products.json";
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {
        let productInSystem = this.products.some((element) => element.code === code);
        if (productInSystem != true) {
            const newProduct = {
                id: this.productId++,
                title,
                description,
                price,
                thumbnail,
                code: "abc" + code++,
                stock
            }
            this.products.push(newProduct);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } else {
            console.error("The code of the product is already in our system");
        }
    };
    getProducts() {
        if (fs.existsSync(this.path)) {
            const productsObjeto = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            return productsObjeto;
        } else {
            console.error("The file does not exist");
        }
    }
    getProductById(id) {
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
    deleteProduct(id) {
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
/*
const productManager = new ProductManager();
productManager.addProduct(
    "manzana",
    "manzana verde de Paraguay",
    340,
    "www.imagen.com.ar",
    10
);
productManager.addProduct(
    "Frutilla",
    "Frutilla super dulce",
    1500,
    "www.frutillaroja.com.ar",
    60
);
productManager.addProduct(
    "Pera",
    "Pera verde dulce",
    1500,
    "www.en la pera.com.ar",
    70
)

productManager.addProduct(
    "manzana verde",
    "manzana verde Esperanza",
    440,
    "www.imagen.com.ar",
    10
);
productManager.addProduct(
    "Aji",
    "Mercado central del aji",
    1500,
    "www.Mcentral.com.ar",
    90
);
productManager.addProduct(
    "Pera amarilla",
    "Pera amarilleo",
    400,
    "www.en la pera otra vez.com.ar",
    120
)
productManager.addProduct(
    "Piña",
    "Piña dulce",
    1500,
    "www.quepiña!.com.ar",
    90
)
*/

export default ProductManager;