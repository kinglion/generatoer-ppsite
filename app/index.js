'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var PpGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      '欢迎使用pp-web生成器!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'runNpmInstall',
      message: '你要安装默认的gulp插件么?',
      default: true
    }, {
      type: 'confirm',
      name: 'createFolders',
      message: '你要生成默认的目录结构么?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.runNpmInstall = props.runNpmInstall;
      this.createFolders = props.createFolders;

      if (this.runNpmInstall) {
        var installDone = this.async();
        this.npmInstall([
          'gulp',
          'gulp-autoprefixer',
          'gulp-concat',
          'gulp-csslint',
          'gulp-jshint',
          'gulp-minify-css',
          'gulp-rename',
          'gulp-sass',
          'gulp-uglify',
          'gulp-size',
          'gulp-rev',
          'gulp-cached',
          'gulp-htmlincluder',
          'gulp-livereload',
          'gulp-plumber',
          'gulp-rimraf',
          'http',
          'st',
          'gulp-imagemin',
          'imagemin-optipng',
          'gulp.spritesmith',
          'gulp-usemin',
          'gulp-minify-html',
          'gulp-rev',
          'gulp-compass',
          'gulp-size',
          'shelljs'
        ], { 'saveDev': true }, installDone);
      }

      if (this.createFolders) {
        this.mkdir('scss');
        this.mkdir('scss/extends');
        this.mkdir('js');
        this.mkdir('css');
        this.mkdir('dist');
        this.mkdir('dist/css');
        this.mkdir('dist/js');


        this.copy('.gitkeep', 'scss/.gitkeep');
        this.copy('.gitkeep','scss/extends/.gitkeep');
        this.copy('.gitkeep', 'css/.gitkeep');
        this.copy('.gitkeep', 'js/.gitkeep');
        this.copy('.gitkeep', 'dist/css/.gitkeep');
        this.copy('.gitkeep', 'dist/js/.gitkeep');

      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.copy('_package.json', 'package.json');
      this.copy('_base.scss', 'scss/extends/base.scss');
      this.copy('_config.rb', 'comfig.rb');
      this.copy('_index.html', 'index.html');
    },

    projectfiles: function () {
      this.copy('_gulpfile.js', 'gulpfile.js');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = PpGenerator;
