Promise = require "native-or-bluebird"
path = require "path"


data = ""
process.stdin.on 'data', (chunk) ->
  data += "#{chunk}"

sendResponse = (status, data) ->
  process.stdout.write JSON.stringify({ status, data })
  process.exit()

process.stdin.on 'end', () ->
  d = JSON.parse data
  for r in d.requires
    require(path.join(d.cwd, "node_modules/", r))
  target = path.join d.cwd, d.filepath
  exec = require target
  exec.apply(undefined, d.args).then (result) ->
    sendResponse(true, result)
  , (result) ->
    sendResponse(false, result)

process.stdin.resume();
process.stdin.setEncoding('utf8');
