const parseServiceResponse = (serviceResponse, apiResponse) => {
  if (!serviceResponse) {
    return apiResponse.status(500).json({ error: 'oops...' });
  }
  return apiResponse.status(200).json(serviceResponse);
}

module.exports = {
  parseServiceResponse
};