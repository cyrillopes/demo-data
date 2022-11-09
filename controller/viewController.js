const Product = require('../model/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Paginate = require('../utils/Paginate');

exports.getAllProductsPage = catchAsync(async (req, res, next) => {
  //   const products = await Product.find();
  //   res.status(200).render('products', {
  //     title: 'All Products',
  //     products,
  //   });
  const { page } = req.query;
  let pageNo = Number(page);

  const resultsFromQuery = new Paginate(Product.find(), req.query).pagination();
  const products = await resultsFromQuery.query;
  if (!products.length) pageNo = undefined;
  //*Returns result with query information...............>>>>>  const doc = await features.query.explain();
  res.status(200).render('products', {
    status: 'success',
    title: 'All Products',
    products,
    pageNo,
  });
});
