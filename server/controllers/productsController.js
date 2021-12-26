const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* ROUTING 
___________________________________________________ */
exports.createProduct = catchAsync(async (req, res) => {
  console.log('##########   ADMIN/CREATE:PRODUCT   ##########');

  await Product.create(req.body).then((product) => {
    res.status(201).json({
      status: 'success',
      product: product,
    });
  });
});

exports.getProducts = catchAsync(async (req, res, next) => {
  let log = req.params.id
    ? 'ADMIN/GET:SINGLE_PRODUCT ' + req.params.id
    : 'ADMIN/GET:MULTI_PRODUCTS';

  console.log(`##########   ${log}   ##########`);

  const singleProductID = req.params.id;

  let apiFeatures;
  if (!singleProductID) {
    apiFeatures = new APIFeatures(Product.find(), req.query);
    apiFeatures.filter().sort().limitFields().paginate();
  }

  await (singleProductID
    ? Product.findById(singleProductID) // get single product -> by product ID
    : apiFeatures.query
  ).then((doc) => {
    doc
      ? res.status(200).json({
          status: 'success',
          count: doc.length,
          products: doc,
        })
      : next(new AppError('Product not found', 404));
  });
});

exports.patchProduct = catchAsync(async (req, res, next) => {
  console.log('##########   ADMIN/UPDATE:PRODUCT   ##########');

  await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true /* return the modified doc and not the original */,
    runValidators: true /* validate the inputs before update */,
  }).then((doc) => {
    doc
      ? res.status(201).json({
          status: 'success',
          product: doc,
        })
      : next(new AppError('Product not found', 404));
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  console.log('##########   ADMIN/DELETE:PRODUCT   ##########');

  await Product.findByIdAndDelete(req.params.id).then((doc) => {
    doc
      ? res.status(201).json({
          status: 'success',
          deleted_product: doc,
        })
      : next(new AppError('Product not found', 404));
  });
});
