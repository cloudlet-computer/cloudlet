/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useMemo} from 'react';
import {createEditor, Text, Transforms} from 'slate';
import {Slate, Editable, withReact} from 'slate-react';

import {Leaf} from './components';

interface Props {
  value: any;
  onValueChange(value: any): void;
}

export function BodyEditor({value, onValueChange}: Props) {
  const editor = useMemo(() => withReact(createEditor()), []);

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
          if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
            event.preventDefault();
            Transforms.setNodes(
              editor,
              {bold: true},
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
