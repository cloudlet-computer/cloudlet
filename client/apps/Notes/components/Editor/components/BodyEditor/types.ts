import {Element as SlateElement, Text as SlateText} from 'slate';

export interface Properties extends SlateText {
  bold: boolean;
  italic: boolean;
}

export const Text = {
  ...SlateText,
  isBold(value: any): value is Text {
    return SlateText.isText(value) && value.bold === true;
  },
  isItalic(value: any): value is Text {
    return SlateText.isText(value) && value.italic === true;
  },
};

////////////////////////////////////

enum ElementType {
  Paragraph,
  Blockquote,
  Link,
}

export interface Paragraph extends SlateElement {
  type: ElementType.Paragraph;
}

export interface Blockquote extends SlateElement {
  type: ElementType.Blockquote;
}

export interface Link extends SlateElement {
  type: ElementType.Link;
  url: string;
}

export const Element = {
  ...SlateElement,
  isParagraph(value: any): value is Paragraph {
    return (
      SlateElement.isElement(value) && value.type === ElementType.Paragraph
    );
  },
  isBlockquote(value: any): value is Blockquote {
    return (
      SlateElement.isElement(value) && value.type === ElementType.Blockquote
    );
  },
  isLink(value: any): value is Link {
    return SlateElement.isElement(value) && value.type === ElementType.Link;
  },
};
