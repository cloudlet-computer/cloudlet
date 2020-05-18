import {Editor, Element} from 'slate';
import {ReactEditor} from 'slate-react';

export function extendSlate(editor: Editor & ReactEditor) {
  const {isInline: originalIsInline, insertText: originalInsertText} = editor;

  editor.isInline = (element: Element) => {
    return originalIsInline(element);
  };

  editor.insertText = (text: string) => {
    // if (isUrl(text)) {
    //   // I think you would
    //   // editor.insertNode({children: [{type: 'link', text, url: smth}]});
    //   return;
    // }

    originalInsertText(text);
  };

  return editor;
}
