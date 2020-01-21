#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var mkdir = require("mkdirp");
var { exec } = require("child_process");

var TEMPLATE_DIR = path.join(__dirname, "pkg");
var MODE_0666 = parseInt("0666", 8);

if (!fs.existsSync("./package.json")) {
    console.log("please run <npm init> before you run this file");
    process.exit(1)
}

function copyFile(from, to) {
    write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'));
}

function copyFileMulti(fromDir, toDir) {
    fs.readdirSync(path.join(TEMPLATE_DIR, fromDir)).forEach(function (file) {
        if (fs.lstatSync(path.join(TEMPLATE_DIR, fromDir, file)).isFile()) {
            copyFile(path.join(fromDir, file), path.join(toDir, file));
        }
    });
}

function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    console.log('   \x1b[36mcreate\x1b[0m : ' + file);
}

mkdir.sync("./tasks");
mkdir.sync("./src/html");
mkdir.sync("./src/html/layouts");
mkdir.sync("./src/scss");
mkdir.sync("./src/js");
mkdir.sync("./src/images");
mkdir.sync("./src/media");

copyFileMulti("tasks", "./tasks");
copyFileMulti("src/html", "./src/html");
copyFileMulti("src/html/layouts", "./src/html/layouts");
copyFileMulti("src/scss", "./src/scss");
copyFileMulti("src/js", "./src/js");
copyFileMulti("src/images", "./src/images");
copyFileMulti("src/media", "./src/media");

copyFile("gulpfile.js", "./gulpfile.js") /*gulp file */

exec("npm i -D @babel/core @babel/preset-env gulp gulp-babel gulp-clean-css gulp-concat gulp-connect gulp-declare gulp-imagemin gulp-minify gulp-pug gulp-rename gulp-sass gulp-sourcemaps gulp-terser gulp-uglify imagemin-jpeg-recompress uglify-js", function(err, stdout, stderr){
    if(err){
            console.log(err);
            process.exit(1);
    }

    console.log("installing npm packages. please wait..");
    
    // console.log(stdout);
    stdout.on("data", function(data){
        console.log(data.toString());
        
    })
});