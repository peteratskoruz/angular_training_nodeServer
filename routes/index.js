const express = require('express');
const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const router = express.Router();


function addProduct(req, res){
    let newProduct = req.body;
    const newId = Math.max.apply(Math, products.map(x=> x.id))+1;
    newProduct.id = newId;
    products.push(newProduct);
    res.send(newProduct).status(200);
}

function getProducts(resq, res){
    console.log('inside get products');
    res.json(products).status(200);
}

function getProductById(req, res){
    const productId = req.params.productId;
    res.json(products.find(x => x.id == productId));
}

router.post('/api/products', addProduct);
router.get('/api/products', getProducts);
router.get('/api/products/:productId', getProductById);

module.exports = router;