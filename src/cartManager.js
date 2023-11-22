import fs from 'fs';

class cartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  getCarts() {
    if (!this.carts.length) {
      this.loadCarts();
    }
    return this.carts;
  }

  addCart() {
    const cart = new Cart();
    cart.id = this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1;

    this.carts.push(cart);
    this.saveCarts();
    return cart;
  }

  getProducts(id) {
    const cart = this.getCarts().find(element => element.id == id);
    return cart ? cart.products : [];
  }

  addProductToCart(cartId, productId) {
    const cartIndex = this.carts.findIndex(element => element.id == cartId);

    if (cartIndex === -1) {
      return "Carrito no existe";
    }

    const cart = this.carts[cartIndex];
    const productIndex = cart.products.findIndex(element => element.product == productId);

    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    this.carts[cartIndex] = cart;
    this.saveCarts();
    return this.carts[cartIndex];
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  saveCarts() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
  }
}

class Cart {
  constructor() {
    this.products = [];
  }
}

export default cartManager;
