export default function EditorActions(injector, drdLinting) {
  var editorActions = injector.get('editorActions', false);

  editorActions && editorActions.register({
    toggleLinting: function() {
      drdLinting.toggle();
    }
  });
}

EditorActions.$inject = [
  'injector',
  'drdLinting'
];