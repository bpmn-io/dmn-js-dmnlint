'use strict';

var path = require('path');

var singleStart = process.env.SINGLE_START;

var absoluteBasePath = path.resolve(__dirname);

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE', 'PhantomJS' ]
var browsers =
  (process.env.TEST_BROWSERS || 'ChromeHeadless')
    .replace(/^\s+|\s+$/, '')
    .split(/\s*,\s*/g);

var suite = 'test/suite.js';


module.exports = function(karma) {

  var config = {

    frameworks: [
      'mocha'
    ],

    files: [
      suite
    ],

    preprocessors: {
      [suite]: [ 'webpack', 'env' ]
    },

    reporters: [ 'progress' ],

    browsers: browsers,

    browserNoActivityTimeout: 30000,

    autoWatch: true,
    singleRun: false,

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.dmnlintrc$/,
            use: 'dmnlint-loader'
          },
          {
            test: /\.(css|dmn|svg)$/,
            type: 'asset/source'
          }
        ]
      },
      resolve: {
        modules: [
          'node_modules',
          absoluteBasePath
        ]
      }
    },
    devtool: 'eval-source-map'
  };

  if (singleStart) {
    config.browsers = [].concat(config.browsers, 'Debug');
    config.envPreprocessor = [].concat(config.envPreprocessor || [], 'SINGLE_START');
  }

  karma.set(config);
};
