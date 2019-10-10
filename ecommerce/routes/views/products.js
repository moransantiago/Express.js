const express = require('express');
const router = express.Router();
const productService = require('../../services/products');

router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
        const products = await productService.getProducts({ tags }); 
        res.render('products', { products });
    } catch (error) {
        next(error);
    }
});

module.exports = router;