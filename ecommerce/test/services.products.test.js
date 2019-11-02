const assert = require('assert');
const proxyquire = require('proxyquire');

const {
    MongoLibMock,
    getAllStub,
    createStub
} = require('../utils/mocks/mongoLib');

const {
    productsMocks,
    filteredProductsMock
} = require('../utils/mocks/products');

describe('services - products', () => {
    const ProductsService = proxyquire('../services/products', { '../lib/mongo': MongoLibMock });

    const productsService = new ProductsService();

    describe('when getProducts is called', async () => {
        it('should call the getAll MongoLib method', async () => {
            await productsService.getProducts({});
            assert.strictEqual(getAllStub.called, true);
        });

        it('should return an array of products', async () => {
            const result = await productsService.getProducts({});
            const expected = productsMocks;
            assert.deepEqual(result, expected);
        });
    });

    describe('when getProducts metohd is called with tags', async () => {
        it('should call the getAll MongoLib method with tags args', async () => {
            await productsService.getProducts({ tags: ['expensive'] });
            const tagQuery = { tags: { $in: ['expensive'] } };
            assert.strictEqual(getAllStub.calledWith('products', tagQuery), true);
        });

        it('should return an array of products filtered by the tag', async () => {
            const result = await productsService.getProducts({ tags: ['expensive'] });
            const expected = filteredProductsMock('expensive');
            assert.deepEqual(result, expected);
        });
    });
});