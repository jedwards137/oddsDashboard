const fetch = require('node-fetch');

const callEndpoint = async (endpointUri) => {
  return await fetch(endpointUri)
    .then(response => response.json())
    .catch(error => {
      console.log(error);
      return null;
    });
}

module.exports = {
  callEndpoint
}