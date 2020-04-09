import pkg from './package.json';

import { string } from 'rollup-plugin-string';
import resolve from '@rollup/plugin-node-resolve';

function pgl(plugins=[]) {
  return [
    resolve(),
    string({
      include: '**/*.svg'
    }),
    ...plugins
  ];
}

const srcEntry = pkg.source;

export default [
  {
    input: srcEntry,
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true }
    ],
    external: [
      'dmnlint',
      'min-dom',
      'min-dash',
      'diagram-js/lib/util/EscapeUtil',
      'moddle'
    ],
    plugins: pgl()
  }
];