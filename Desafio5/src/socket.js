import { Server } from "socket.io";
import ProductManager from "./services/ProductManager.js";

// Creo la instancia ProductManager y me traigo el array de products
const productManager = new ProductManager();

// inicio el socket
export function initSocket(server) {
  const io = new Server(server);

  // Eventos de socket.io
  io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado!");
    // Envio los productos al cliente que se conectó
    socket.emit("products", await productManager.getProducts());

    // veo si hay un producto y se lo paso a todos
    socket.on("new-product", async (element) => {
      await productManager.addProduct(element);
      // Envio el evento a todos los conectados
      io.emit("products", await productManager.getProducts());
    });

    // Si solicito borrar un product, lo saco de la lista
    socket.on("del-product", async (element) => {
      await productManager.deleteProduct(element);
      // Propago el evento a todos los clientes conectados
      io.emit("products", await productManager.getProducts());
    });
  });

  return io;
}