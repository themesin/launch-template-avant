/*

=========================================================

* Coming soon template based on Avant UI Kit

* Copyright 2021 Themesin https://themesin.com/

* Created by https://themesin.com/

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software. Contact us if you want to remove it.

*/

const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const del = require("del");

const paths = {

  dist: {
    base: "./dist",
    assets: "./dist/assets/",
  },
  root: {
    base: "./",
    node: "./node_modules",
  },

  src: {
    base: "./src",
    js: "./src/assets/js/*.js",
    assets: "./src/assets/**/*.*",
  },
};



gulp.task("assets", function () {
  return gulp
    .src(paths.src.assets)
    .pipe(gulp.dest(paths.dist.assets))
    .pipe(browserSync.stream());
});

gulp.task("clear", function () {
  return del([paths.dist.base]);
});

gulp.task("index", function () {
  return gulp
    .src(paths.src.base + "/*.html")
    .pipe(gulp.dest(paths.dist.base))
    .pipe(browserSync.stream());
});


gulp.task(
  "launch",
  gulp.series(
    "clear",
    "assets",
    "index",
    function () {
      browserSync.init({
        server: "./dist",
      });

      gulp.watch("src/*.html", gulp.series("index"));
      gulp.watch(paths.src.assets, gulp.series("assets"));
    }
  )
);


gulp.task("default", gulp.series("launch"));
