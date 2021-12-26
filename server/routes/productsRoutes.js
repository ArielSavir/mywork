// const express = require('express');

// const router = express.Router();
// const productsController = require('../controllers/productsController');

/*
// MULTER:

Multer helps uploading pictures
and store them in a public folder
-- for now: it is not implemented, YET.


//// form-data body parser (allows to get uploaded images)
const fs = require('fs');
const multer = require('multer');
// storage: sets the destination folder and the file name
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // dynamically create subfolder per creatorID
    // IN A REAL LIFE: pic would be stored in AWS S3
    console.log('req.currentUser:', req.currentUser);
    const creatorID = req.currentUser._id;
    const dest = `./bucket/${creatorID}`;
    fs.access(dest, function (error) {
      if (error) {
        return fs.mkdir(dest, (error) => callback(error, dest));
      } else {
        return callback(null, dest);
      }
    });
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  },
});
// fileFilter
const fileFilter = (req, file, callback) => {
  // reject files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(new Error('File mimetype wrong'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
*/

// // ROUTES
// router.route('/').post(productsController.createProduct);
// // .post(upload.single('image'), productsController.createProduct);

// router
//   .route('/:id?') // :id? -> q sign: optional arg
//   .get(productsController.getProducts)
//   .patch(productsController.patchProduct)
//   .delete(productsController.deleteProduct);

// module.exports = router;
