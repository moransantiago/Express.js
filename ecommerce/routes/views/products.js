const express = require('express');
const router = express.Router();

const productService = require('../../services/products');  //<--Products service

const { config } = require('../../config/index') ;  //<--Config file

//  Setting cache
const cacheResponse = require('../../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../../utils/time');

router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;

    try {
        const products = await productService.getProducts({ tags }); 
        res.render('products', { products, dev: config.dev });
    } catch (error) {
        next(error);
    }
});

module.exports = router;