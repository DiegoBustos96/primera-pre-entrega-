import express from 'express';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/products',productRoutes);
app.use('/product',cartRoutes);



app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});



















