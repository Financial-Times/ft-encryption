'use strict';

const gulp = require('gulp');

if (process.env.NODE_ENV !== "production") {
  var jshint = require('gulp-jshint');
  var istanbul = require('gulp-istanbul');
  var mocha = require('gulp-mocha');
}

const files = {
  server: ["./lib/*.js", "./lib/*/*.js"],
  tests: ["./tests/*.js"],
  config: ["./gulpfile.js", "./package.json"]
};

gulp.task("lint", () => {
  let allFiles = Object.keys(files).reduce((accum, key) => {
    return accum.concat(files[key]);
  }, []);
  return gulp.src(allFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task("behaviour-tests", () => {
   gulp.src(files.server)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src(files.tests)
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          reporters: [ 'lcov', 'json', 'text', 'text-summary']
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 75 } }))
        .once('error', function () {
          process.exit(1);
         })
        .once('end', function () {
          process.exit();
        });
    });
});

gulp.task("setTestEnv", () => {
  process.env.NODE_ENV = 'test';
});

gulp.task("test", ["setTestEnv", "lint", "behaviour-tests"]);
