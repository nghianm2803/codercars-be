const { sendResponse, AppError } = require("../helpers/utils.js");
const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  const car = {
    data: "car",
    flag: false,
  };

  try {
    //always remember to control your inputs
    if (!car) throw new AppError(402, "Bad Request", "Create Car Error");
    //mongoose query
    const created = await Car.create(car);
    sendResponse(res, 200, true, { data: created }, null, "Create Car Success");
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  //in real project you will getting condition from from req then construct the filter object for query
  // empty filter mean get all
  const filter = {};
  try {
    //mongoose query
    // await collection.updateMany({}, { $set: { isDeleted: false } });
    const listOfFound = await Car.find(filter).limit(5);
    const totalCar = await Car.countDocuments(filter);

    sendResponse(
      res,
      200,
      true,
      listOfFound,
      null,
      "Get Car List Successfully!",
      totalCar
    );
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  //you will also get updateCar from req
  // empty target and info mean update nothing
  const targetId = null;
  const updateCar = "";

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndUpdate(targetId, updateCar, options);

    sendResponse(res, 200, true, { data: updated }, null, "Update car success");
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const targetId = null;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndDelete(targetId, options);

    sendResponse(res, 200, true, { data: updated }, null, "Delete car success");
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
