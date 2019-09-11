const express = require('express');
const router = express.Router();

const products = [
    {
        name: 'Red shoes',
        price: 75,
        image: 'https://asset1.surfcdn.com/adidas-originals-shoes-adidas-originals-superstar-shoes-red-s09.jpg?w=1200&h=1200&r=4&q=80&o=ZYFqwNupNKogN2Kfye67ywgxDZsj&V=eSEm'
    },
    {
        name: 'Black bike',
        price: 300,
        image: 'http://www.bikesdirect.com/products/gravity/images/g29_black_2100.jpg'
    }
];

router.get('/', (req, res) => {
    res.render('products', { products });
});

module.exports = router;