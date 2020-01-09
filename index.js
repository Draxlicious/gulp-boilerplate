var fs = require("fs");

fs.copyFileSync("./pkg/gulpfile.js", "./gulpfile.js")
var tasks = fs.readdirSync("./pkg/tasks");

fs.mkdirSync("./tasks")

tasks.forEach(function(file){
    fs.copyFileSync(`./pkg/tasks/${file}`, `./tasks/${file}`)
})