/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useMemo} from 'react';
import {createEditor, Editor, Transforms} from 'slate';
import {Slate, Editable, withReact} from 'slate-react';

import {extendSlate} from './extend-slate';
import {Text} from './types';
import {Leaf} from './components';

interface Props {
  value: any;
  onValueChange(value: any): void;
}

export function BodyEditor({value, onValueChange}: Props) {
  const editor = useMemo(() => extendSlate(withReact(createEditor())), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        onValueChange(value);
      }}
    >
      <Editable
        renderLeaf={(props) => <Leaf {...props} />}
        onKeyDown={(event) => {
          if (!event.ctrlKey && !event.metaKey) {
            return;
          }

          event.preventDefault();

          if (event.key === 'b') {
            const [match] = Editor.nodes(editor, {
              match: (node) => Text.isBold(node),
            });

            Transforms.setNodes(
              editor,
              {
                bold: match == null,
              },
              // Apply it to text nodes, and split the text node up if the
              // selection is overlapping only part of it.
              {match: (n) => Text.isText(n), split: true},
            );
          }

          if (event.key === 'i') {
            const [match] = Editor.nodes(editor, {
              match: (node) => Text.isItalic(node),
            });

            Transforms.setNodes(
              editor,
              {
                italic: match == null,
              },
              // Apply it to text nodes, and split the text node up if the
              // selection is overlapping only part of it.
              {match: (n) => Text.isText(n), split: true},
            );
          }
        }}
      />
    </Slate>
  );
}
