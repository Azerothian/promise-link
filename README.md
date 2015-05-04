# promise-link

A asynchronous helper library to run components transparently in a separate process via a promise,

it uses stdin and stdout of the spawned process and JSON.stringify/parse to pass the arguments and response.

You can target coffee files or equivalent, etc by including a register function e.g. coffee-script/register in an array on the 2nd parameter of the link function. This will execute a require call before it attempts to load the target object see example below.

## Requirements

> native-or-bluebird

## Required for ES5 runtime

> bluebird

## Example

### Main code

link = require "promise-link"

func = link "./test-target", ["coffee-script/register"], "node"

func("arg1", "arg2").then (result) ->
  console.log "resolve"
, (err) ->
  console.log "reject"

### Child code - test-target.coffee

Promise = require "native-or-bluebird"

module.exports = (arg1, arg2) ->
  return new Promise (resolve, reject) ->
    if arg1 == "arg1"
      return resolve("test")
    return reject("arg1 is not arg1")


## Changelog

0.0.1 - Initial Commit

0.0.2 - Expanded parameters to allow for executing require before the target component is executed
