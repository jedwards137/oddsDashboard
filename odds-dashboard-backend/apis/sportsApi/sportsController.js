const { 
  sportsGetAll, 
  sportsGetById, 
  sportsCreate, 
  sportsDeleteById, 
  sportsPatchById 
} = require('../../services/sportsService');
const { parseServiceResponse } = require('../common/responseParser');

const getAllSports = async (req, res) => {
  const allSports = await sportsGetAll();
  const response = parseServiceResponse(allSports, res);
  return response;
};

const getSportById = async (req, res) => {
  const { id } = req.params;
  const sportForId = await sportsGetById(id);
  const response = parseServiceResponse(sportForId, res);
  return response;
};

const postSport = async (req, res) => {
  const createdSport = await sportsCreate(req.body);
  const response = parseServiceResponse(createdSport, res);
  return response;
};

const deleteSport = async (req, res) => {
  const { id } = req.params;
  const deletedSport = await sportsDeleteById(id);
  const response = parseServiceResponse(deletedSport, res);
  return response;
};

const patchSport = async (req, res) => {
  const { id } = req.params;
  const updatedSport = await sportsPatchById(id, req.body);
  const response = parseServiceResponse(updatedSport, res);
  return response;
};

module.exports = {
  getAllSports,
  getSportById,
  postSport,
  deleteSport,
  patchSport
};