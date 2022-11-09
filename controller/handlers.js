const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Paginate = require('../utils/Paginate');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // let filter = {};
    // if (req.params.id) filter = { product: req.params.id };
    //?Executing the query
    const resultsFromQuery = new Paginate(Model.find(), req.query).pagination();
    // console.log(query);
    const doc = await resultsFromQuery.query;
    //*Returns result with query information...............>>>>>  const doc = await resultsFromQuery.query.explain();
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with the given ID', 404));
    }
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    console.log(doc);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with the provided id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with the provided id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
