const mongoose = require('mongoose');

// Schema validator for filter
const filterSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'filter must have a type'],
      minLength: [2, 'type length must be at least 2 characters'],
      maxLength: [15, 'type length can be up to 15 characters'],
      trim: true,
    },
    variant: {
      type: String,
      required: [true, 'filter must have a variant'],
      minLength: [2, 'variant length must be at least 2 characters'],
      maxLength: [15, 'variant length can be up to 15 characters'],
      trim: true,
    },
    icon: {
      type: [String],
      required: [false, 'filter may have an Icon name'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// UNIQUE INDEX
filterSchema.index({ type: 1, variant: 1 }, { unique: true });

/* MODEL MIDDLEWARE 
_____________________________________________________*/
// Document MiddleWare:
// manipulate the object before saving / creating (not before petch / update) into db
filterSchema.pre('save', function (next) {
  console.log('DO -> BEFORE CREATING');
  next();
});
filterSchema.post('save', function (doc, next) {
  console.log('DO -> AFTER CREATING');
  next();
});

// Query MiddleWare:
// manipulate the query: add more filters, hide fields etc.
filterSchema.pre(['find', 'findOne'], function (next) {
  // 'this' refers to current query

  this.curtime = Date.now();
  console.log('>>> STARTED AT ', this.curtime);
  next();
});

filterSchema.post(['find', 'findOne'], function (doc, next) {
  // 'this' refers to current query

  let timedif = Date.now() - this.curtime;
  console.log('milliseconds dif: ', timedif);
  next();
});

const Filter = mongoose.model('filter', filterSchema);
Filter.createIndexes();
module.exports = Filter;
