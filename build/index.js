(function() {
  var Promise, path, spawn;

  Promise = require("native-or-bluebird");

  path = require("path");

  spawn = require("child_process").spawn;

  module.exports = function(filepath, requires, proc) {
    if (requires == null) {
      requires = [];
    }
    if (proc == null) {
      proc = "node";
    }
    return function() {
      var args;
      args = Array.prototype.slice.call(arguments);
      return new Promise(function(resolve, reject) {
        var cwd, i, j, l, p, rc, ref, response;
        l = path.join(__dirname, "/launch");
        rc = spawn(proc, [l], {
          cwd: process.cwd()
        });
        rc.stdin.setEncoding = "utf-8";
        rc.stderr.setEncoding = "utf-8";
        rc.stdout.setEncoding = "utf-8";
        rc.stderr.on("data", function(data) {
          return console.log("error", "" + data);
        });
        rc.on("error", function() {
          return console.error("error reject", arguments);
        });
        response = "";
        rc.stdout.on("data", function(data) {
          if (data != null) {
            return response = "" + response + data + "\n";
          }
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
        cwd = process.cwd();
        p = JSON.stringify({
          requires: requires,
          args: args,
          cwd: cwd,
          filepath: filepath
        });
        for (i = j = 0, ref = p.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          rc.stdin.write(p[i]);
        }
        return rc.stdin.push(null);
      });
    };
  };

}).call(this);
