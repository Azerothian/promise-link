ln = require "./index"


test = ln("./test-target")

test("resolve").then (result) ->
  console.log "resolve - #{result}"
, (result) ->
  console.log "reject - #{result}"


test("reject").then (result) ->
  console.log "resolve - #{result}"
, (result) ->
  console.log "reject - #{result}"
