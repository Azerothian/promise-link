(function() {
  var Promise;

  Promise = require("native-or-bluebird");

  module.exports = function(result) {
    return new Promise(function(resolve, reject) {
      if (result === "resolve") {
        return resolve(result);
      }
      return reject(result);
    });
  };

}).call(this);
