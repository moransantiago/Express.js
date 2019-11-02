const express = require('express');
const passport = require('passport');

const productService = require('../../services/products');  //<--The service to interact with mongo

const validation = require('../../utils/middlewares/validationHandler');
const {
    productIdSchema,
    productTagSchema,
    createProductSchema,
    updateProductSchema
} = require('../../utils/schemas/products')

require('../../utils/auth/strategies/jwt'); //<--Jwt Strategy to auth requests

productsApi = app => {
    const router = express.Router();
    app.use('/api/products', router);

    router.get( //<--Get all items
        '/',
        async (req, res, next) => {
            const { tags } = req.query;

            try {
                const products = await productService.getProducts({ tags });

                res.status(200).json({
                    data: products,
                    message: 'products listed'
                });
            } catch (error) {
                next(error);
            }
        }
    );

    router.get( //<--Get an specific item
        '/:productId',
        async (req, res, next) => {
            const { productId } = req.params;

            try {
                const product = await productService.getProduct({ productId });

                res.status(200).json({
                    data: product,
                    message: 'product retrieved'
                });
            } catch (error) {
                next(error);
            }
        }
    );

    router.post(    //<--Create an item
        '/',
        validation(createProductSchema),
        async (req, res, next) => {
            const { body: product } = req;

            try {
                const createdProduct = await productService.createProduct({ product });

                res.status(201).json({
                    data: createdProduct,
                    message: 'product created'
                });
            } catch (error) {
                next(error);
            }
        }
    );

    router.put( //<--Update an item
        '/:productId',
        passport.authenticate('jwt', { session: false }),   //<--This line authenticates the user
        validation({ productId: productIdSchema }, 'params'),
        validation(updateProductSchema),
        async (req, res, next) => {
            const { productId } = req.params;
            const { body: product } = req;

            try {
                const updateProduct = await productService.updateProduct({ productId, product });

                res.status(200).json({
                    data: updateProduct,
                    message: 'product updated'
                });
            } catch (error) {
                next(error);
            }
        }
    );

    router.delete(  //<--Delete an item
        '/:productId',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            const { productId } = req.params;

            try {
                const product = await productService.deleteProduct({ productId });

                res.status(200).json({
                    data: product,
                    message: 'product deleted'
                });
            } catch (error) {
                next(error);
            }
        }
    );
}

module.exports = productsApi;