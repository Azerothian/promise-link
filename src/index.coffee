Promise = require "native-or-bluebird"
path = require "path"
{spawn} = require "child_process"


module.exports = (fileName, e = "node") ->
  return () ->
    args = Array.prototype.slice.call(arguments)
    return new Promise (resolve, reject) ->
      f = path.join fileName
      l = path.join(__dirname, "/launch.js")

      rc = spawn e, [l, f], {
        cwd: process.cwd()
      }
      rc.stdin.setEncoding = "utf-8"
      rc.stdout.setEncoding = "utf-8"
      response = ""
      rc.on "error", ()->
        console.log "error", arguments
        reject("error")
      rc.on 'close', (code) ->
        if response == ""
          return reject("empty response")
        res = JSON.parse response
        if res.status
          return resolve(res.data)
        else
          return reject(res.data)
      rc.stdout.on "data", (data) ->
        console.log "-","#{data}"
        if data?
          response = "#{response}#{data}\n"

      rc.stdin.write JSON.stringify(args)
      rc.stdin.push null
        #logger.log "write"
