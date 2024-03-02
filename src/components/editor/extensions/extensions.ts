import { mergeAttributes } from '@tiptap/core'

import {
  CharacterCount,
  Color,
  Focus,
  FontFamily,
  Highlight,
  HorizontalRule,
  Link,
  Placeholder,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TaskItem,
  TaskList,
  TextAlign,
  TextStyle,
  Underline,
} from './index'

type ExtensionOptionsType = {
  placeholder?: string
  charactersLimit?: number | null
}

export const getEditorExtensions = ({
  placeholder,
  charactersLimit,
}: ExtensionOptionsType) => [
  StarterKit.configure({
    codeBlock: false,
    heading: {
      levels: [1, 2, 3],
    },
    horizontalRule: false,
  }),
  SlashCommand,
  CharacterCount.configure({
    limit: charactersLimit,
  }),
  Color,
  Focus,
  FontFamily,
  Highlight.configure({
    multicolor: true,
  }),
  HorizontalRule.extend({
    renderHTML() {
      return [
        'div',
        mergeAttributes(this.options.HTMLAttributes, {
          'data-type': this.name,
        }),
        ['hr'],
      ]
    },
  }),

  TextStyle,
  Underline,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {}
    },
  }).configure({
    types: ['heading', 'paragraph'],
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Link.configure({
    HTMLAttributes: {
      class: 'link',
    },
    openOnClick: false,
  }),
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => {
      const defaultPlaceholder = 'Click here to start typing...'
      return placeholder || defaultPlaceholder
    },
  }),
]
