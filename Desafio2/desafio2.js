//se entrega desafio Martes 24/09


const fs = require('fs').promises; //llamo a libreria FS

class ProductManager {

    constructor() {
        this.products = [];
        this.path = './products.json';
    }

    generadorId() {
        return this.products.length + 1; // Agregue un id por cada producto, que es la longitud del array + 1.
    }

    async addProduct(title, description, price, thumbnail, code, stock, id) {

        const existingProduct = this.products.find(product => product.code === code); // logica para verificar que el codigo "code", no se repita 2

        if (existingProduct) {
            console.log("El código de producto ya está en uso.");

        } else {

            // genero el Id para cada producto

            id = this.generadorId();
            this.products.push({ title, description, price, thumbnail, code, stock, id }); // hago un push del objeto producto, para crear un array de objeto con cada valor de la prop del objeto.
        }
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            //console.log("Producto agregado correctamente.");
        } catch (error) {
            console.error("Error al escribir en el archivo:", error);
        }


    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (err) {
            console.error('No se pudo obtener la lista de productos', err);
            return [];
        }
    }

    async getProductsById(id) {

        const productFilteredById = this.products.find((product) => product.id === id)

        if (!productFilteredById) {

            // console.log("producto no encontrado")
        } else {
            console.log('El Id consultado arrojo el siguiente resultado', productFilteredById)

        }

        return productFilteredById;


    }
    
    async updateProduct(id, updatedProductData) {
        // Busco el producto con el ID otorgado
        const productIndex = this.products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            console.log("Producto no encontrado en update product");
            return false;
        }

        // Actualizo el producto con los nuevos datos
        this.products[productIndex] = { ...this.products[productIndex], ...updatedProductData };

        // Guardo los productos actualizados en el archivo Json
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log("Producto actualizado correctamente.");
            return true;

        } catch (error) {
            console.error("Error al escribir en el archivo:", error);
            return false;
        }
    }

    async deleteProducts(id) {

        try {
            const product = await this.getProducts();
            const findId = product.findIndex((e) => e.id === id)
            if (findId === -1) {
                console.log("ID Not Found!!!");
                return;
            }
            product.splice(findId, 1); //Elimino del aray con el id pasado,

            // Reescribo el array en el Json.

            await fs.writeFile(this.path, JSON.stringify(product));

        } catch (err) {
            console.log("No puedo borrar el producto");

        }

    }

    async stockProducts() {
        try {
            await this.addProduct(
                "manzana",
                "manzana verde de Paraguay",
                340,
                "www.imagen.com.ar",
                "A1",
                10,
            );
            await this.addProduct(
                "Pera",
                "Pera dulce de estacion",
                300,
                "www.imagen2.com.ar",
                "A3",
                20,
            );
            await this.addProduct(
                "Sandia",
                "Sandia importada de Brasil",
                700,
                "www.imagen3.com.ar",
                "A4",
                50,
            );
            await this.addProduct(
                "Frutilla",
                "Frutilla super dulce",
                1500,
                "www.frutillaroja.com.ar",
                "A5",
                60,
            );
            await this.addProduct(
                "Pera",
                "Pera verde dulce",
                1500,
                "www.en la pera.com.ar",
                "A6",
                70,
            );

        } catch (err) {

            console.error('Algo salio mal, intente de nuevo por favor')

        }
    }
}

const products = new ProductManager();

(async () => {
    await products.stockProducts();
    const updatedData = {
        title: "manzana grandota",
        description: "manzana verde de Paraguay",
        thumbnail: "wwww.imagen.com.ar",
        code: "A1",
        stock: 10,
    }

    const result = await products.updateProduct(1, updatedData);
    if (result) {
        console.log("Producto actualizado con exito");
    } else {
        console.log("No se pudo actualizar el producto");
    }

    setTimeout(async () => {
        const productID = await products.getProductsById(1); // coloca el Id que quieres consultar!
    }, 3000)
})();



