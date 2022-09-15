const Sport = require('../models/sportModel');
const mongoose = require('mongoose');

const sportsGetAll = async () => {
  const allSports = await Sport.find();
  return allSports;
}

const sportsGetById = async (id) => {
  const isValidMongooseId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidMongooseId) {
    return null;
  }
  const sportForId = await Sport.findById(id);
  if (!sportForId) {
    return null;
  }
  return sportForId;
}

const sportsCreate = async (requestBody) => {
  const { 
    sportKey, 
    sportTitle, 
    commenceTime, 
    completed, 
    homeTeam, 
    awayTeam, 
    scores, 
    sportInfoUpdatedAt, 
    bookmakers 
  } = requestBody;
  try {
    const createdSport = await Sport.create({ 
      sportKey, 
      sportTitle, 
      commenceTime, 
      completed, 
      homeTeam, 
      awayTeam, 
      scores, 
      sportInfoUpdatedAt, 
      bookmakers 
    });
    return createdSport;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

const sportsDeleteById = async (id) => {
  const isValidMongooseId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidMongooseId) {
    return null;
  }
  const deletedSport = await Sport.findOneAndDelete({ _id: id });
  if (!deletedSport) {
    return null;
  }
  return deletedSport;
}

const sportsPatchById = async (id, requestBody) => {
  const isValidMongooseId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidMongooseId) {
    return null;
  }
  const updatedSport = await Sport.findOneAndReplace({ _id: id }, {
    ...requestBody
  });
  if (!updatedSport) {
    return null;
  }
  return updatedSport;
}

module.exports = {
  sportsGetAll,
  sportsGetById,
  sportsCreate,
  sportsDeleteById,
  sportsPatchById
};