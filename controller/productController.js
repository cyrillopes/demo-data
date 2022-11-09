const Product = require('../model/productModel');
const factory = require('./handlers');

exports.getProduct = factory.getOne(Product, { path: 'category' });
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.getAllProduct = factory.getAll(Product, { path: 'category' });
