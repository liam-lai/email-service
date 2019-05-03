const environment = process.env.NODE_ENV || 'local';
const config = require(`../configs/${environment}.json`);
if (environment == 'local') {
  require('dotenv').config()
}

function getEnvKey(object) {
  for (let key of Object.keys(object)) {
    if (typeof (object[key]) == 'object') {
      getEnvKey(object[key])
    }
    else if (typeof (object[key]) == 'string' && object[key].match(/^_ENV /)) {
      secretKey = object[key].slice(5)
      object[key] = process.env[secretKey]
    }
  }
}
getEnvKey(config)

exports.get = () => {
  return config
}
