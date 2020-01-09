var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var concat = require('gulp-concat');
var cleanCSS = require("gulp-clean-css")
var terser = require("gulp-terser")
var babel = require("gulp-babel")
// require npm installs

// gulp.src tager den stig jeg vil arbejde med
// sourcemaps viser korrekt linje tal for css
// sourcemaps.write() udskriver det i vores css fil
// on error fortæller os fejlbeskeder
// concat kombiner ALLE scss filer til main.css
// cleanCSS minifier css og fjerne alle whitespaces
// dest vælger hvilket sted filerne bliver compiled til
// connect.reload sørger for den køre på live server via watch
function scssTask(){
  return gulp.src("src/scss/*.scss")
  .pipe(sourcemaps.init())
  .pipe(sass().on("error", sass.logError))
  .pipe(concat('main.css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
}

// Babel is a Javascript compiler which takes ES6/ES7 and beyond and converts them to Javascript which we can safely use in production - Popular additions from ES6 which you may recognise... 1. const/let - 2.'fat' arrow functions - 3.template literals
// concat kombiner ALLE js filer til main.js
// terser compiler/minifier js filer og fjerner alle whitespaces
function jsTask(){
  return gulp.src("src/js/*.js")
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
}))
  .pipe(concat('main.js'))
  .pipe(terser())
  .pipe(gulp.dest("dist/js"))
  .pipe(connect.reload());
}
// rename lader os omdøbe alle filer
function htmlTask() {
    return gulp.src("src/html/*.pug")
      .pipe(sourcemaps.init()) 
      .pipe(pug({
            pretty: false,
            doctype: "html"
      }))
      .pipe(
        rename(function(path){
          if(path.basename != "index"){
            path.dirname = path.basename;
            path.basename = "index";
            path.extname = ".html";
          } else {
            path.extname = ".html";
          }
        })
      )
     
      // opretter filerne til dist
      // destination distribution
      .pipe(gulp.dest("dist"))
      // instant live refresh on save
      .pipe(connect.reload());

  }
// watch lader os live opdatere hvis vi har connect.reload
  function watchHTML(){
    return gulp.watch("src/html/*.pug", { ignoreInitial: false }, htmlTask);
  }
  function watchLayoutHTML(){
    return gulp.watch("src/html/layouts/*.pug", { ignoreInitial: false }, htmlTask);
  }

  function watchCSS(){
    return gulp.watch("src/scss/*.scss", { ignoreInitial: false }, scssTask);
  }

  function watchJS(){
    return gulp.watch("src/js/*.js", { ignoreInitial: false }, jsTask);
  }

  // exporter alle funkioner til andre filer
module.exports = {
    htmlTask,
    watchHTML,
    scssTask,
    jsTask,
    watchCSS,
    watchJS,
    watchLayoutHTML
};