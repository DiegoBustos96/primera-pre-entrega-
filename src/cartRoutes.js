import express from "express";
import ProductManager from './productManager';
import CartManager from './cartManager.js';


const router = express.Router();
const cartManager = new CartManager('carritos.json');

router.post('/', (req, res) => {
  res.json(cartManager.addCart());
});

router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  res.json(cartManager.getProducts(cid) || []);
});

router.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  res.json(cartManager.addProductToCart(Number(cid), Number(pid)));
});

export default router;
