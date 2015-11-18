var config       = require('../config')
if(!config.tasks.html) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var path        = require('path')
var fs          = require('fs')
var jade        = require('gulp-jade')

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{' + config.tasks.html.extensions + '}'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest),
}

var htmlTask = function() {
  return gulp.src(paths.src)
    .pipe(jade({
      pretty: process.env.NODE_ENV !== 'production',
      data: JSON.parse( fs.readFileSync('src/html/data/global.json', { encoding: 'utf8' }) )
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())

}

gulp.task('html', htmlTask)
module.exports = htmlTask
