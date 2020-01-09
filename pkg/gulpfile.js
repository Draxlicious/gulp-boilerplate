var connect = require("gulp-connect");
var { watchHTML, htmlTask, scssTask, jsTask, watchCSS, watchJS, watchLayoutHTML } = require("./tasks/html")
var { imageTask, watchImages } = require("./tasks/images")
var { mediaTask, watchMedia } = require("./tasks/media")
// importer filer fra html og klader deres funktions fra html exports

  function watch(){
    watchHTML();
    watchCSS();
    watchJS();
    watchImages()
    watchMedia()
    watchLayoutHTML();
      // live server
      connect.server({
        livereload: true,
        root: "dist"
      });
  }

  function build(done){
    scssTask();
    htmlTask();
    jsTask();
    imageTask()
    mediaTask()
    done()
  }

 
  // exports default er watch funktionen
  exports.default = watch
  // exporter build funktionen
  exports.build = build;