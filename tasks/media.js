var gulp = require("gulp");
var connect = require("gulp-connect")


function mediaTask(){
    return gulp.src("src/media/*")

    .pipe(gulp.dest("dist/media"))
    .pipe(connect.reload())
}

function watchMedia(){
    return gulp.watch("src/media/*", { ignore: false}, mediaTask);
}

module.exports = {
    mediaTask,
    watchMedia
}