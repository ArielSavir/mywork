const fs = require('fs');
const Filter = require('../models/filterModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* ROUTING 
___________________________________________________ */
exports.loadFilters = catchAsync(async (req, res, next) => {
  console.log('##########   ADMIN/LOAD:FILTERS   ##########');

  await Filter.find().then((doc) => {
    doc
      ? res.status(200).json({
          status: 'success',
          count: doc.length,
          filters: doc,
        })
      : next(new AppError('Filter not found', 404));
  });
});

exports.createFilter = catchAsync(async (req, res) => {
  console.log('##########   ADMIN/CREATE:FILTERS   ##########');

  await Filter.create(req.body).then((filter) => {
    res.status(201).json({
      status: 'success',
      filter: filter,
    });
  });
});

exports.updateFilter = catchAsync(async (req, res, next) => {
  console.log('##########   ADMIN/UPDATE:FILTERS   ##########' + req.params.id);

  await Filter.findByIdAndUpdate(req.params.id, req.body, {
    new: true /* return the modified doc and not the original */,
    runValidators: true /* validate the inputs before update */,
  }).then((doc) => {
    doc
      ? res.status(201).json({
          status: 'success',
          filter: doc,
        })
      : next(new AppError('Filter not found', 404));
  });
});

exports.deleteFilter = catchAsync(async (req, res, next) => {
  console.log('##########   ADMIN/DELETE:FILTERS   ##########' + req.params.id);

  await Filter.findByIdAndDelete(req.params.id).then((doc) => {
    doc
      ? res.status(201).json({
          status: 'success',
          deleted_filter: doc,
        })
      : next(new AppError('Filter not found', 404));
  });
});
