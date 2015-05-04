(function() {
  var Promise, data, path, sendResponse;

  Promise = require("native-or-bluebird");

  path = require("path");

  data = "";

  process.stdin.on('data', function(chunk) {
    return data += "" + chunk;
  });

  sendResponse = function(status, data) {
    process.stdout.write(JSON.stringify({
      status: status,
      data: data
    }));
    return process.exit();
  };

  process.stdin.on('end', function() {
    var d, exec, i, len, r, ref, target;
    d = JSON.parse(data);
    ref = d.requires;
    for (i = 0, len = ref.length; i < len; i++) {
      r = ref[i];
      require(path.join(d.cwd, "node_modules/", r));
    }
    target = path.join(d.cwd, d.filepath);
    exec = require(target);
    return exec.apply(void 0, d.args).then(function(result) {
      return sendResponse(true, result);
    }, function(result) {
      return sendResponse(false, result);
    });
  });

  process.stdin.resume();

  process.stdin.setEncoding('utf8');

}).call(this);
