(function() {
  var Promise, data, exec, path, sendResponse, target;

  Promise = require("native-or-bluebird");

  path = require("path");

  target = path.join(process.cwd(), process.argv[2]);

  exec = require(target);

  process.stdin.resume();

  process.stdin.setEncoding('utf8');

  data = "";

  process.stdin.on('data', function(chunk) {
    return data += "" + chunk;
  });

  sendResponse = function(status, data) {
    console.log(JSON.stringify({
      status: status,
      data: data
    }));
    return process.exit();
  };

  process.stdin.on('end', function() {
    var args;
    args = JSON.parse(data);
    return exec.apply(void 0, args).then(function(result) {
      return sendResponse(true, result);
    }, function(result) {
      return sendResponse(false, result);
    });
  });

}).call(this);
