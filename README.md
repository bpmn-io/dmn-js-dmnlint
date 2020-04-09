# dmn-js-dmnlint

[![Build Status](https://travis-ci.com/bpmn-io/dmn-js-dmnlint.svg?branch=master)](https://travis-ci.com/bpmn-io/dmn-js-dmnlint)

Integrates [dmnlint](https://github.com/bpmn-io/dmnlint) into [dmn-js](https://github.com/bpmn-io/dmn-js).

See this extension in action as part of the [dmnlint playground (TODO)](https://github.com/bpmn-io/dmnlint-playground).

## Usage

Integrate the linter into [dmn-js](https://github.com/bpmn-io/dmn-js):

```javascript
import lintModule from 'dmn-js-dmnlint';

import DmnModeler from 'dmn-js/lib/Modeler';

import dmnlintConfig from './.dmnlintrc';

var modeler = new DmnModeler({
  linting: {
    dmnlint: dmnlintConfig
  },
  additionalModules: [
    lintModule
  ]
});
```

## Bundle Lint Rules

Use an appropriate plugin/loader for your module bundler (cf. [rollup-plugin-dmnlint](https://github.com/bpmn-io/rollup-plugin-dmnlint), [dmnlint-loader](https://github.com/bpmn-io/dmnlint-loader)) to bundle the dmnlint configuration directly with your application as [shown above](#usage).

Alternatively, pack your local `.dmnlintrc` file using the [dmnlint-pack-config (TODO)](https://github.com/nikku/dmnlint-pack-config) utility:

```shell
dmnlint-pack-config -c .dmnlintrc -o bundled-config.js
```

## Plug-in Lint Rules

Provide the [packed lint rules](#bundle-lint-rules) via the `linting.dmnlint` option. You may set it dynamically, too:

```javascript
var linting = modeler.get('linting');

linting.setLinterConfig(dmnlintConfig);
```

## Resources

* [Issues](https://github.com/bpmn-io/dmn-js-dmnlint/issues)
* [Playground Project (TODO)](https://github.com/bpmn-io/dmnlint-playground)

## Development Setup

```shell
npm install
npm run dev
```

## Credits

The project is based on [`dmn-js-dmnlint`](https://github.com/bpmn-io/dmn-js-dmnlint) built by [philippfromme](https://github.com/philippfromme).

## License

MIT
