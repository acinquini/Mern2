const dotenv = require('dotenv')

const result = dotenv.config();
let envs;

if (!('error' in result)) {
  envs = result.parsed;
} else {
  envs = {};
}

module.exports = envs;