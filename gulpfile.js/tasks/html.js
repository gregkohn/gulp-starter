var config       = require('../config')
if(!config.tasks.html) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var path        = require('path')
var fs          = require('fs')
var jade        = require('gulp-jade')
var data        = require('gulp-data')
var assign      = require('lodash/object/assign')

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{' + config.tasks.html.extensions + '}'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest),
}

var getData = function(file) {
  var localPath  = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFolder, path.basename(file.path)+'.json')

  //The global file specified in at config.tasks.html.globalData is required to exist, even if empty
  var globalPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFolder, config.tasks.html.globalData)
  var globalData = JSON.parse(fs.readFileSync(globalPath, 'utf8'))

  //If there's a local file, return it with the global file
  try {
    var localData  = JSON.parse(fs.readFileSync(localPath, 'utf8'))
    return assign(localData, globalData)
  }

  //Otherwise, just return the global file
  catch (e) {
    return globalData
  }
}

var htmlTask = function() {
  return gulp.src(paths.src)
    .pipe(data(getData))
    .pipe(jade({
      pretty: process.env.NODE_ENV !== 'production'
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())

}

gulp.task('html', htmlTask)
module.exports = htmlTask
