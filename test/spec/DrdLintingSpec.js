import {
  insertCSS
} from 'dmn-js/test/helper';

import Modeler from 'dmn-js/lib/Modeler';

import { DrdLinting } from '../../lib';

import TestContainer from 'mocha-test-container-support';

import dmnlintrc from './.dmnlintrc';

insertCSS('dmn-js-dmnlint', require('assets/css/dmn-js-drd-dmnlint.css'));

insertCSS('diagram-js', require('dmn-js/dist/assets/diagram-js.css'));
insertCSS('dmn-font', require('dmn-js/dist/assets/dmn-font/css/dmn-embedded.css'));


describe('linting', function() {

  let container, editor;

  beforeEach(function(done) {

    container = TestContainer.get(this);

    const diagram = require('./diagram.dmn');

    const modeler = new Modeler({
      container: container,
      drd: {
        additionalModules: [
          DrdLinting
        ]
      },
      common: {
        linting: dmnlintrc
      }
    });

    modeler.importXML(diagram, function(error) {
      if (error) {
        return done(error);
      }

      editor = modeler.getActiveViewer();

      done();
    });
  });


  it('should load specified config', function() {

    // when
    const linting = editor.get('linting'),
          config = linting.getConfig();

    // then
    expect(linting).to.exist;

    expect(config).to.eql(dmnlintrc);
  });
});
