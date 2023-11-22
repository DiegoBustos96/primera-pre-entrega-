import fs from "fs";


class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.loadProducts();
  }

  addProduct(product) {
    const { title, description, code, price, status, stock, category, thumbnails } = product;

    if (!title || !description || !price || !code || !stock || !category) {
      console.log("El producto debe estar completo.");
      return "El producto debe estar completo.";
    }

    if (status === undefined) {
      product.status = true;
    }

    const repetido = this.products.find((element) => element.code === product.code);

    if (repetido !== undefined) {
      console.log("Producto con código repetido");
      return "Producto con código repetido";
    } else {
      product.id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;

      this.products.push(product);
      this.saveProducts();
      return product;
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const porId = this.products.find((element) => element.id === id);

    return porId !== undefined ? porId : "Product not found";
  }

  updateProduct(id, updateInfo) {
    if (this.products.find((element) => element.code === updateInfo.code) !== undefined) {
      return "Este código ya existe para otro producto.";
    } else {
      const elementoPorId = this.products.find((element) => element.id === id);

      if (elementoPorId === undefined) {
        return "Product not found";
      } else {
        const indicePorID = this.products.findIndex((element) => element.id === id);

        this.products[indicePorID] = { ...elementoPorId, ...updateInfo };
        this.saveProducts();
        return this.products[indicePorID];
      }
    }
  }

  deleteProduct(id) {
    const indicePorID = this.products.findIndex((element) => element.id === id);

    if (indicePorID !== -1) {
      this.products.splice(indicePorID, 1);
      this.saveProducts();
      return "Se ha eliminado el producto.";
    } else {
      return "Product not found";
    }
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }
}

export default ProductManager;
