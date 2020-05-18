import {Editor} from 'slate';

export function toggleBold(editor: Editor) {
  const boldNodes = Editor.nodes(editor, {
    match: (node) => node.bold,
  });
}
