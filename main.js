const axios = require('axios')
const CreateCitation = require('./bot')

axios.post('https://763nvtf765.execute-api.us-east-1.amazonaws.com/dev/citations', {
    metroArea: 'Philadelphia'
  })
  .then(function (response) {
    CreateCitation(response.data.citationNumber)
  })
  .catch(function (error) {
    console.log(error);
  });

