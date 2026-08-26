import bpmnIo from 'eslint-plugin-bpmn-io';

const files = {
  ignored: [
    'dist'
  ],
  build: [
    'eslint.config.mjs',
    'karma.conf.js',
    'rollup.config.js'
  ],
  source: [
    'lib/**/*.js'
  ],
  test: [
    'test/**/*.js'
  ]
};

export default [
  {
    ignores: files.ignored
  },
  ...bpmnIo.configs.node.map(config => ({
    ...config,
    files: files.build
  })),
  ...bpmnIo.configs.browser.map(config => ({
    ...config,
    files: files.source
  })),
  ...bpmnIo.configs.browser.map(config => ({
    ...config,
    files: files.test,
    languageOptions: {
      ...config.languageOptions,
      globals: {
        ...config.languageOptions?.globals,
        require: false
      }
    }
  })),
  ...bpmnIo.configs.mocha.map(config => ({
    ...config,
    files: files.test
  }))
];
