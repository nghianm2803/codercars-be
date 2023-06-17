const { sendResponse, AppError } = require("../helpers/utils.js");
const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    // Validate input
    const carData = req.body;

    // Validate required fields
    const requiredFields = {
      Make: "Make is empty",
      Model: "Model is empty",
      Year: "Year is empty",
      "Transmission Type": "Transmission Type is empty",
      "Vehicle Size": "Vehicle Size is empty",
      "Vehicle Style": "Vehicle Style is empty",
      MSRP: "MSRP is empty",
    };

    const missingFields = [];
    for (const [field, errorMessage] of Object.entries(requiredFields)) {
      if (!carData[field]) {
        missingFields.push(errorMessage);
      }
    }

    if (missingFields.length > 0) {
      throw new AppError(400, "Bad Request", missingFields.join(", "));
    }

    if (!carData) throw new AppError(402, "Bad Request", "Create Car Error");
    const createdCar = await Car.create(carData);
    sendResponse(res, 200, true, createdCar, null, "Create Car Success");
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  //in real project you will getting condition from from req then construct the filter object for query
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  const offset = (page - 1) * limit;

  // const filter = {_id: ObjectId("648d0ea432e8813d5fe51775")};
  const filter = {};
  try {
    //mongoose query
    // await Car.updateMany({}, { $set: { isDeleted: false } });
    const listOfFound = await Car.find(filter).skip(offset).limit(limit);
    const totalCar = await Car.countDocuments(filter);

    sendResponse(
      res,
      200,
      true,
      listOfFound,
      null,
      "Get Car List Successfully!",
      totalCar,
      page
    );
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  try {
    const targetId = req.params.id;
    const updateCar = req.body;
    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true };
    //mongoose query
    const updated = await Car.findByIdAndUpdate(targetId, updateCar, options);

    sendResponse(res, 200, true, updated, null, "Update car success");
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const targetId = req.params.id;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndDelete(targetId, options);

    sendResponse(res, 200, true, updated, null, "Delete car success");
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
