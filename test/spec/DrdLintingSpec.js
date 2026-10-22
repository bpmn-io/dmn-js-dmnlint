import {
  insertCSS
} from 'dmn-js/test/helper';

import Modeler from 'dmn-js/lib/Modeler';

import { DrdLinting } from '../../lib';

import { expect } from 'chai';

import TestContainer from 'mocha-test-container-support';

import dmnlintrc from './.dmnlintrc';

insertCSS('dmn-js-dmnlint', require('assets/css/dmn-js-drd-dmnlint.css'));

insertCSS('diagram-js', require('dmn-js/dist/assets/diagram-js.css'));
insertCSS('dmn-js-shared', require('dmn-js/dist/assets/dmn-js-shared.css'));
insertCSS('dmn-js-drd', require('dmn-js/dist/assets/dmn-js-drd.css'));
insertCSS('dmn-js-decision-table', require('dmn-js/dist/assets/dmn-js-decision-table.css'));
insertCSS('dmn-js-decision-table-controls', require('dmn-js/dist/assets/dmn-js-decision-table-controls.css'));
insertCSS('dmn-js-literal-expression', require('dmn-js/dist/assets/dmn-js-literal-expression.css'));
insertCSS('dmn-js-boxed-expression', require('dmn-js/dist/assets/dmn-js-boxed-expression.css'));
insertCSS('dmn-js-boxed-expression-controls', require('dmn-js/dist/assets/dmn-js-boxed-expression-controls.css'));
insertCSS('dmn-font', require('dmn-js/dist/assets/dmn-font/css/dmn-embedded.css'));

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'true';


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

    modeler.importXML(diagram).then(function() {
      editor = modeler.getActiveViewer();

      done();
    }).catch(done);
  });


  (singleStart ? it.only : it)('should load specified config', function() {

    // when
    const linting = editor.get('linting'),
          config = linting.getConfig();

    // then
    expect(linting).to.exist;

    expect(config).to.eql(dmnlintrc);
  });
});

describe('i18n', function() {

  let container, editor;
  const translations = {
    'Toggle linting': 'تغییر وضعیت عیب یابی',
    'Element is missing label/name': 'المان فاقد برچسب/نام است',
    '{errors} Errors, {warnings} Warnings': '{errors} خطا, {warnings} هشدار'
  };

  beforeEach(function(done) {

    container = TestContainer.get(this);

    const diagram = require('./diagram.dmn');

    function translateModule(template, replacements = {}) {

      // Translate
      let transTemplate = translations[template] || template;

      // Replace
      return transTemplate.replace(/{([^}]+)}/g, function(_, key) {
        return key in replacements ? replacements[key] : '{' + key + '}';
      });
    }

    const modeler = new Modeler({
      container: container,
      drd: {
        additionalModules: [
          DrdLinting,
          {
            translate: [ 'value', translateModule ]
          }
        ]
      },
      common: {
        linting: dmnlintrc
      }
    });

    modeler.importXML(diagram).then(function() {
      editor = modeler.getActiveViewer();

      done();
    }).catch(done);
  });

  it('should translate lint issues text', function(done) {

    // when
    const linting = editor.get('drdLinting'),
          eventBus = editor.get('eventBus');

    linting.toggle(true);

    // then

    eventBus.once('linting.completed', function(event) {

      const button = container.querySelector('button.djsl-button.djsl-button-error');
      expect(button).to.exist;
      expect(button.title).to.equal(translations['Toggle linting']);

      const buttonTextSpan = button.querySelector('span');
      expect(buttonTextSpan).to.exist;
      let expected = translations['{errors} Errors, {warnings} Warnings']
        .replace('{errors}', 1)
        .replace('{warnings}', 0);
      expect(buttonTextSpan.innerText).to.equal(expected);

      const shapeLabelRequiredMessage = container.querySelector('a[data-rule="label-required"]');
      expect(shapeLabelRequiredMessage).to.exist;
      expect(shapeLabelRequiredMessage.dataset.message).to.equal(translations['Element is missing label/name']);

      done();
    });
  });

});