import DrdEditorActions from './DrdEditorActions';
import DrdLinting from './DrdLinting';
import Linting from '../shared';

export default {
  __init__: [ 'drdLinting', 'drdLintingEditorActions' ],
  __depends__: [ Linting ],
  drdLinting: [ 'type', DrdLinting ],
  drdLintingEditorActions: ['type', DrdEditorActions ]
};
