(function() {
  var ln, test;

  ln = require("./index");

  test = ln("./test-target");

  test("resolve").then(function(result) {
    return console.log("resolve - " + result);
  }, function(result) {
    return console.log("reject - " + result);
  });

  test("reject").then(function(result) {
    return console.log("resolve - " + result);
  }, function(result) {
    return console.log("reject - " + result);
  });

}).call(this);
