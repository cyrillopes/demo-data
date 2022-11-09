const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

// const Category = require('../model/categoryModel');
const Product = require('../model/productModel');

const DB =
  'mongodb+srv://cyrillo:admin@cluster0.v3nzy.mongodb.net/demoData?retryWrites=true&w=majority';

//Creating mongoose connection
mongoose
  .connect(DB, {
    // option just in case of deprecation warnings if the mongoose package get updated
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successfull'));

//Read json file
const category = JSON.parse(
  fs.readFileSync(`${__dirname}/category.json`, 'utf-8')
);
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/product.json`, 'utf-8')
);

//IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    // await Category.create(category, { validateBeforeSave: false });
    await Product.create(product, { validateBeforeSave: false });
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//DELETE ALL DATA FROM DATABASE COLLECTION
const deleteData = async () => {
  try {
    // await Category.create(tours);
    await Product.deleteMany();
    console.log('Deleted all records');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
