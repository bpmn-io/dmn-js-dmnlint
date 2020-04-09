import { Linter } from 'dmnlint';

var emptyConfig = {
  resolver: {
    resolveRule: function() {
      return null;
    }
  },
  config: {}
};

export default function Linting(
    config,
    eventBus
) {

  this._linterConfig = emptyConfig;

  var self = this;

  config && eventBus.once('diagram.init', function() {

    // bail out if config was already provided
    // during initialization of other modules
    if (self.getConfig() !== emptyConfig) {
      return;
    }

    try {
      self.setConfig(config);
    } catch (err) {
      console.error(
        '[dmn-js-dmnlint] Invalid lint rules configured. ' +
        'Please doublecheck your linting.dmnlint configuration, ' +
        'cf. https://github.com/bpmn-io/dmn-js-dmnlint#configure-lint-rules'
      );
    }
  });
}

Linting.prototype.setConfig = function(linterConfig) {

  if (!linterConfig.config || !linterConfig.resolver) {
    throw new Error('Expected linterConfig = { config, resolver }');
  }

  this._linterConfig = linterConfig;

  this._eventBus.fire('linting.configChanged');
};

Linting.prototype.getConfig = function() {
  return this._linterConfig;
};

Linting.prototype.lint = function(moddleRoot) {
  var linter = new Linter(this._linterConfig);

  return linter.lint(moddleRoot);
};

Linting.$inject = [
  'config.linting',
  'eventBus'
];
