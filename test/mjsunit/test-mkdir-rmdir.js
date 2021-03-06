process.mixin(require("./common"));

var dirname = path.dirname(__filename);
var fixtures = path.join(dirname, "fixtures");
var d = path.join(fixtures, "dir");

var mkdir_error = false;
var rmdir_error = false;

posix.mkdir(d, 0x666).addCallback(function () {
  puts("mkdir okay!");

  posix.rmdir(d).addCallback(function () {
    puts("rmdir okay!");

  }).addErrback(function (e) {
    puts("rmdir error: " + e.message);
    rmdir_error = true;
  });

}).addErrback(function (e) {
  puts("mkdir error: " + e.message);
  mkdir_error = true;
});

process.addListener("exit", function () {
  assertFalse(mkdir_error);
  assertFalse(rmdir_error);
  puts("exit");
});
