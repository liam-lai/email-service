const axios = require('axios')

const client = async (options) => {
  return await axios(options)
}

module.exports = {
  client
}