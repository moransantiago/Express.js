const express = require('express');
const router = express.Router();
const productMocks = require('../../utils/mocks/products');

// GET FULL LIST

router.get('/', (req, res) => {
    const { query } = req.query;

    res.status(200).json({
        data: productMocks,
        message: 'products listed'
    }); 
});

// GET AN SPECIFIC ITEM

router.get('/:productId', (req, res) => {
    const { productId } = req.params;

    res.status(200).json({
        data: productMocks[0],
        message: 'product listed'
    }); 
});

router.post('/', (req, res) => {
    

    res.status(201).json({
        data: productMocks[0],
        message: 'product added'
    }); 
});

router.put('/:productId', (req, res) => {
   
    res.status(200).json({
        data: productMocks,
        message: 'product updated'
    }); 
});

router.delete('/', (req, res) => {
   
    res.status(200).json({
        data: productMocks[0],
        message: 'product deleted'
    }); 
});

module.exports = router;