
import fs from "fs";

class ProductManager {
    #id = 0;

    constructor() {
        this.productId = 1;
        this.products = ["esta vacio"];
        this.path = './src/services/products.json';
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
            console.log("Cree el archivo vacio");
        }

    }
    /*
    generadorId() {
        return this.products.length + 1; // Agregue un id por cada producto, que es la longitud del array + 1.
    }*/

    async addProduct({
        title,
        description,
        code,
        price,
        stock,
        thumbnails,
    }) {
        try {
            // Me traigo mi array desde el file y lo guardo en una constante
            const totalProducts = await this.getProducts();
            // Creo una funcion para revisar si el campo esta vacio o es undefined
            function isEmpty(str) {
                return !str || str.length === 0;
            }
            // Reviso si esta repetido el code del producto
            let codeRepeat = totalProducts.filter((product) => product.code === code);
            if (codeRepeat.length > 0) {
                console.log("El code ingresado ya existe");
                return "El code ingresado ya existe";
            } else if (
                isEmpty(title) ||
                isEmpty(description) ||
                isEmpty(code) ||
                isEmpty(price) ||
                isEmpty(stock)
            ) {
                console.log("Te falta completar un campo");
                return "Te falta completar un campo";
            }
            const product = {
                title,
                description,
                code,
                price,
                stock,
                thumbnails,
            };
            // Si tengo ya productos, empiezo a sumar desde el ultimo id que tengo cargado en el file
            if (totalProducts.length > 0) {
                this.#id = totalProducts[totalProducts.length - 1].id;
            }
            // Le agrego un id al product
            product.id = this.#getId();
            // Defino que status es true por defecto
            product.status = true;
            // Si no se define el thumnails le asigno un array vacio
            if (product.thumbnails == undefined) {
                product.thumbnails = [];
            }
            // Lo pusheo al array
            totalProducts.push(product);
            // Escribo de nuevo el archivo del array en mi json
            await fs.promises.writeFile(this.path, JSON.stringify(totalProducts));
            return product;
        } catch (err) {
            // Si hay error imprimo el error en consola
            console.log("No puedo agregar productos");
        }
    }
    async getProducts() {
        if (fs.existsSync(this.path)) {
            const productsObjeto = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            return productsObjeto;
        } else {
            console.error("The file does not exist");
        }
    }

    #getId() {
        this.#id++;
        return this.#id;
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