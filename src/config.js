const environment = process.env.NODE_ENV || 'local';
const config = require(`../configs/${environment}.json`);
exports.get = () => {
  return config
}
