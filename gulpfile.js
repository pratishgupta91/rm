var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var gulpCopy = require('gulp-copy');
var gulpRename = require("gulp-rename");
var gulpClean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('bin', {read: false})
        .pipe(gulpClean());
});

gulp.task("build", ['clean'], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./"));
});

gulp.task('copyChrome', ['build'], function () {
    gulp.src(["app/**/*"])
        .pipe(gulp.dest('bin/chrome'));
});

gulp.task('copyEdge', ['build'], function () {
    gulp.src(["app/**/*"])
        .pipe(gulp.dest('bin/edge')); 
});

gulp.task('copyChromeManifest', ['clean'], function () {
    gulp.src("./manifests/manifest_chrome.json")
        .pipe(gulpRename("bin/chrome/manifest.json"))
        .pipe(gulp.dest("./"));  
});

gulp.task('copyEdgeManifest', ['clean'], function () {
    gulp.src("./manifests/manifest_edge.json")
        .pipe(gulpRename("bin/edge/manifest.json"))
        .pipe(gulp.dest("./"));  
});

gulp.task('default', ['clean', 'build', 'copyChrome', 'copyEdge', 'copyChromeManifest', 'copyEdgeManifest']);