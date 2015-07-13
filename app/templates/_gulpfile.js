var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    rename  = require('gulp-rename'),
    cssmin  = require('gulp-minify-css'),
    concat  = require('gulp-concat'),
    cache = require('gulp-cached'),
    uglify  = require('gulp-uglify'),
    jshint  = require('gulp-jshint'),
    csslint = require('gulp-csslint'),
    includer = require('gulp-htmlincluder'),
    prefix  = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    http = require('http'),
    st = require('st'),
    imagemin = require('gulp-imagemin'),
    optipng = require('imagemin-optipng'),
    spritesmith = require('gulp.spritesmith'),
    usemin = require('gulp-usemin'),
    minifyHtml = require('gulp-minify-html'),
    rev = require('gulp-rev'),
    compass = require('gulp-compass'),
    size    = require('gulp-size'),
    shelljs = require('shelljs');


/**
 * 压缩图片
 */
gulp.task('imgmin',function(){
  return gulp.src('images/source/*.png')
  .pipe(optipng({ optimizationLevel: 1 })())
  .pipe(gulp.dest('images'));
});

/**
 * 实时监控html的变化，并发出监听触发事件
 */
gulp.task('html',function(){
  gulp.src('*.html')
  .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
  .pipe(livereload());
});

/**
 * css检测
 */
gulp.task('csslint', function() {
  gulp.src('css/*.css')
    .pipe(csslint({
      'compatible-vendor-prefixes': false,
      'box-sizing': false,
      'important': false,
      'known-properties': false
    }))
    .pipe(csslint.reporter());
});


/**
 * 引用compass
 */

gulp.task('compass', function() {
  gulp.src('scss/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      config_file: './config.rb',
        css: 'css',
        sass: 'scss',
        image: 'images'
    }))
    .pipe(prefix())
    .on('error', function(err) {
      // Would like to catch the error here 
    })
    .pipe(gulp.dest('assets/temp'))
    .pipe(livereload());
});


/*gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(concat('j.js'))
    .pipe(gulp.dest('js'));
});*/

gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/**
 * 合并雪碧图
 */
gulp.task('sprite', function () {
  var spriteData = gulp.src('images/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    imgPath: '../images/sprite.png',
    algorithm: 'binary-tree',
    cssFormat: 'scss'
  }));
  spriteData.img
    .pipe(imagemin())
    .pipe(gulp.dest('images/'));

  spriteData.css
    .pipe(gulp.dest('scss/sprite/'));
});

gulp.task('clean',function(){
  return gulp.src('dist/js/**/*.js', { read: false }) // much faster 
    .pipe(rimraf());
});

gulp.task('jsx',function(){
  shelljs.exec("jsx js/jsx js");
}); 

gulp.task('usemin',['clean'], function () {
  return gulp.src('./*.html')
      .pipe(usemin({
        html: [minifyHtml({empty: true})],
        js: [obfuscate({ replaceMethod: obfuscate.ZALGO }), rev()]
      }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('watch',['server'], function() {
  livereload.listen();
  //gulp.watch('scss/*.scss', ['scss', 'csslint']);
  //gulp.watch('js/*.js', ['jshint', 'js']);
  gulp.watch('images/sprite/*',['sprite']);
  gulp.watch('*.html',['html']);
  gulp.watch('scss/*.scss', ['compass']);
  gulp.watch('js/*.js',['jshint']);
});



gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname, index: 'index.html', cache: false })
  ).listen(8080, done);
});

gulp.task('default', ['watch']);
gulp.task('build', ['scss', 'csslint', 'js', 'jshint', 'watch']);


gulp.task('buildZepto', function() {
  shelljs.cd("bower_components/zepto");
  shelljs.env["MODULES"] = "zepto event ajax detect callbacks deferred touch";
  shelljs.exec("npm install");
  shelljs.exec("npm run-script dist");
});