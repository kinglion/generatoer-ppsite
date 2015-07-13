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

    var prompts = [ {
      type: 'confirm',
      name: 'createFolders',
      message: '你要生成默认的目录结构么?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.createFolders = props.createFolders;
      if (this.createFolders) {
        this.mkdir('scss');
        this.mkdir('scss/extends');
        this.mkdir('js');
        this.mkdir('images');
        this.mkdir('images/sprite');
        this.mkdir('css');
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.copy('_package.json', 'package.json');
      this.copy('_style.scss', 'scss/extends/style.scss');
      this.copy('_base.scss', 'scss/extends/base.scss');
      this.copy('_fix-sprite.scss', 'scss/extends/fix-sprite.scss');
      this.copy('_config.rb', 'config.rb');
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
