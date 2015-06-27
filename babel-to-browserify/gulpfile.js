var gulp = require("gulp");
var browserify = require("browserify");
var through2 = require("through2");
var babelify = require("babelify");

var src = "./index.js";
var dest = "./build/";

gulp.task("build", function () {
  return gulp.src(src)
  .pipe(through2.obj(function (file, enc, next) {
    browserify(file.path, { debug: true })
    .transform(babelify.configure({}))
    .bundle(function (err, res) {
      if (err) { return next(err); }
      file.contents = res;
      next(null, file);
    });
  }))
  .on("error", function (error) {
    console.log(error.stack);
    this.emit("end");
  })
  .pipe(gulp.dest(dest));
});

gulp.task("default", ["build"]);
