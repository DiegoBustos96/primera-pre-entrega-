import express from 'express';
import ProductManager from './productManager';


const router = express.Router();
const manager = new ProductManager('productos.json');

router.get('/', (req, res) => {
  const { limit } = req.query;
  const products = manager.getProducts();

  res.json(Number(limit) ? products.slice(0, limit) : products);
});

router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  res.json(manager.getProductById(pid) || "Product not found");
});

router.post('/', (req, res) => {
  const producto = req.body;
  res.json(manager.addProduct(producto));
});

router.put('/:pid', (req, res) => {
  const productoModificado = req.body;
  res.json(manager.updateProduct(Number(req.params.pid), productoModificado));
});

router.delete('/:pid', (req, res) => {
  res.json(manager.deleteProduct(Number(req.params.pid)));
});

export default router;
