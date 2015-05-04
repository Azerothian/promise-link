Promise = require "native-or-bluebird"
path = require "path"
{spawn} = require "child_process"

module.exports = (filepath, requires = [], proc = "node") ->
  return () ->
    args = Array.prototype.slice.call(arguments)
    return new Promise (resolve, reject) ->
      l = path.join __dirname, "/launch"
      rc = spawn proc, [l], {
        cwd: process.cwd()
      }
      rc.stdin.setEncoding = "utf-8"
      rc.stderr.setEncoding = "utf-8"
      rc.stdout.setEncoding = "utf-8"

      rc.stderr.on "data", (data) ->
        console.log "error", "#{data}"

      rc.on "error", () ->
        console.error "error reject", arguments

      response = ""
      rc.stdout.on "data", (data) ->
        if data?
          response = "#{response}#{data}\n"

      rc.on 'close', (code) ->
        if response == ""
          return reject("empty response")
        res = JSON.parse response
        if res.status
          return resolve(res.data)
        else
          return reject(res.data)

      cwd = process.cwd()
      p = JSON.stringify({ requires, args, cwd, filepath })

      for i in [0...p.length]
        rc.stdin.write p[i]
      rc.stdin.push null
