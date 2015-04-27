Promise = require "native-or-bluebird"

module.exports = (result) ->
  return new Promise (resolve, reject) ->
    if result == "resolve"
      return resolve(result)
    return reject(result)
