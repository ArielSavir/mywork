const express = require('express');

const router = express.Router();
const filtersController = require('../controllers/filtersController');
const productsController = require('../controllers/productsController');

// FILTERS
router
  .route('/filters')
  .get(filtersController.loadFilters)
  .post(filtersController.createFilter);

router
  .route('/filters/:id?')
  .patch(filtersController.updateFilter)
  .delete(filtersController.deleteFilter);

// PRODUCTS
router.route('/products').post(productsController.createProduct);

router
  .route('/products/:id?') // :id? -> q sign: optional arg
  .get(productsController.getProducts)
  .patch(productsController.patchProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
