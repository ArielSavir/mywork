const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  filterType: {
    type: String,
    required: true,
  },
  filterVariant: {
    type: String,
    required: true,
  },
});

// Schema validator for product
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product must have a Name'],
      unique: [true, 'Product name must be unique'],
      minLength: [2, 'Product name length must be at least 2 characters'],
      maxLength: [40, 'Product name length can be up to 40 characters'],
      trim: true,
    },
    productDesc: {
      type: String,
      required: [true, 'Product must have a Description'],
      minLength: [4, 'Product desc length must be at least 4 characters'],
      maxLength: [40, 'Product desc length can be up to 40 characters'],
      trim: true,
    },
    productFilters: {
      type: [filterSchema],
      required: [true, 'Product must have at least one Filter'],
    },
    productCost: { type: Number, required: [true, 'Product must have a cost'] },
    productInventory: {
      type: Number,
      required: [true, 'Product inventory can be 0 to 1000'],
      min: 0,
      default: 0,
    },
    // productImageURL: {
    //   type: [String],
    //   required: [true, 'Product must be presented with an image. URL//:bucket'],
    // },
    productStatus: {
      type: [String],
      required: [
        true,
        'Product status enum [active, inactive, deleted, updated]',
      ],
      enum: {
        values: ['active', 'inactive', 'deleted'],
        message: 'Status must be one of: active, inactive, deleted',
      },
      default: 'active',
    },
    productModified: {
      type: [Date],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* MODEL MIDDLEWARE 
_____________________________________________________*/
// Document MiddleWare:
// manipulate the object before saving / creating (not before petch / update) into db
productSchema.pre('save', function (next) {
  console.log('DO -> BEFORE CREATING');

  this.productModified = Date.now();
  next();
});
productSchema.post('save', function (doc, next) {
  console.log('DO -> AFTER CREATING');
  next();
});

// Query MiddleWare:
// manipulate the query: add more filters, hide fields etc.
productSchema.pre(['find', 'findOne'], function (next) {
  // 'this' refers to current query

  this.curtime = Date.now();
  console.log('>>> STARTED AT ', this.curtime);
  next();
});

productSchema.post(['find', 'findOne'], function (doc, next) {
  // 'this' refers to current query

  let timedif = Date.now() - this.curtime;
  console.log('milliseconds dif: ', timedif);
  next();
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;
