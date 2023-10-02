//se entrega desafio Martes 12/09

class ProductManager {

    constructor() {
        this.products = [];
    }

    generadorId() {

        return this.products.length + 1; // Agregue un id por cada producto, que es la longitud del array + 1.

    }
    addProduct(title, description, price, thumbnail, code, stock, id) {

        const existingProduct = this.products.find(product => product.code === code); // logica para verificar que el codigo "code", no se repita 2

        if (existingProduct) {
            console.log("El código de producto ya está en uso.");

        } else {

            id = this.generadorId();
            this.products.push({ title, description, price, thumbnail, code, stock, id }); // hago un push del objeto producto, para crear un array de objeto con cada valor de la prop del objeto.

        }

        // genero el Id para cada producto

    }


    getProducts() {
        return this.products;
    }

    getProductsById() {

        const productFilteredById = this.products.find(product => product.id);

        if (!productFilteredById) {

            console.log("producto no encontrado")

        }

        return productFilteredById;


    }




}


const products = new ProductManager();
products.addProduct("manzana", "manzana verde de Paraguay", 50, "www", "A1", 10);
products.addProduct("pera", "Pera dulce de estacion", 30, "www", "A2", 23);
products.addProduct("sandia", "Sandia importada de Brasil", 40, "www", "A3", 40);
products.addProduct("sandia", "Sandia importada de Brasil", 40, "www", "A3", 40);


const productID = products.getProductsById(1);

console.log(productID);



console.log(products)







