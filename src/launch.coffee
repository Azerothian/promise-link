Promise = require "native-or-bluebird"
path = require "path"

target = path.join process.cwd(), process.argv[2]

exec = require target
process.stdin.resume();
process.stdin.setEncoding('utf8');

data = ""
process.stdin.on 'data', (chunk) ->
  data += "#{chunk}"

sendResponse = (status, data) ->
  console.log JSON.stringify({
    status
    data
  })
  process.exit()

process.stdin.on 'end', () ->
  args = JSON.parse data
  exec.apply(undefined, args).then (result) ->
    sendResponse(true, result)
  , (result) ->
    sendResponse(false, result)
