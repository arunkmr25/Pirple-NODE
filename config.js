var environments = {};
environments.staging = {
  httpPort:3000,
  envName:'development'
};

var currentEnv = typeof(process.env.NODE_ENV) !== 'undefined' ? process.env.NODE_ENV : '';
var environmentToExport = typeof(environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;
module.exports = environmentToExport;
