(function() {
  var Promise, path, spawn;

  Promise = require("native-or-bluebird");

  path = require("path");

  spawn = require("child_process").spawn;

  module.exports = function(fileName, e) {
    if (e == null) {
      e = "node";
    }
    return function() {
      var args;
      args = Array.prototype.slice.call(arguments);
      return new Promise(function(resolve, reject) {
        var f, l, rc, response;
        f = path.join(fileName);
        l = path.join(__dirname, "/launch.js");
        rc = spawn(e, [l, f], {
          cwd: process.cwd()
        });
        rc.stdin.setEncoding = "utf-8";
        rc.stdout.setEncoding = "utf-8";
        response = "";
        rc.on("error", function() {
          console.log("error", arguments);
          return reject("error");
        });
        rc.on('close', function(code) {
          var res;
          if (response === "") {
            return reject("empty response");
          }
          res = JSON.parse(response);
          if (res.status) {
            return resolve(res.data);
          } else {
            return reject(res.data);
          }
        });
        rc.stdout.on("data", function(data) {
          console.log("-", "" + data);
          if (data != null) {
            return response = "" + response + data + "\n";
          }
        });
        rc.stdin.write(JSON.stringify(args));
        return rc.stdin.push(null);
      });
    };
  };

}).call(this);
