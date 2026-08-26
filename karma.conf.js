'use strict';

var path = require('path');

var absoluteBasePath = path.resolve(__dirname);

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE', 'PhantomJS' ]
var browsers =
  (process.env.TEST_BROWSERS || 'ChromeHeadless')
    .replace(/^\s+|\s+$/, '')
    .split(/\s*,\s*/g);

var suite = 'test/suite.js';


module.exports = function(karma) {
  karma.set({

    frameworks: [
      'mocha'
    ],

    files: [
      suite
    ],

    preprocessors: {
      [suite]: [ 'webpack' ]
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
  });
};
