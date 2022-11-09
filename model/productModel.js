const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  prodName: {
    type: String,
    required: [true, 'A product should have a name'],
    maxlength: [40, 'A product must not have length greater than 40'], //Validator
    minlength: [10, 'A product must not have length less than 10'], //Validator
  },
  title: {
    type: String,
    required: [true, 'A product should have a title'],
  },
  description: {
    type: String,
  },
  //Referencing
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
});
//?REFERENCING middleware
productSchema.pre(/^find/, function (next) {
  //populating the result using referencing
  this.populate({
    path: 'category',
    select: '-__v',
  });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
