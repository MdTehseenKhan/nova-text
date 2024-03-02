import type { Editor, Range } from '@tiptap/core'

import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListOrderedIcon,
  ListTodoIcon,
  ListIcon,
  TableIcon,
  MinusIcon,
  LucideIcon,
} from 'lucide-react'

export interface SuggestionItemType {
  title: string
  description: string
  searchTerms: string[]
  icon: LucideIcon
  command: (editor: Editor, range: Range) => void
}

const getSuggestionItems = ({
  query,
}: {
  query: string
}): SuggestionItemType[] => {
  return [
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large'],
      icon: Heading1Icon,
      command: (editor: Editor, range: Range) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run()
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      searchTerms: ['subtitle', 'medium'],
      icon: Heading2Icon,
      command: (editor: Editor, range: Range) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run()
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      searchTerms: ['subtitle', 'small'],
      icon: Heading3Icon,
      command: (editor: Editor, range: Range) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run()
      },
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bullet list.',
      searchTerms: ['unordered', 'point'],
      icon: ListIcon,
      command: (editor: Editor, range: Range) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering.',
      searchTerms: ['ordered'],
      icon: ListOrderedIcon,
      command: (editor: Editor, range: Range) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      },
    },
    {
      title: 'To-do List',
      description: 'Track tasks with a to-do list.',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: ListTodoIcon,
      command: (editor: Editor, range: Range) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      },
    },
    {
      title: 'Table',
      description: 'Insert a table.',
      searchTerms: ['codeblock', 'programming', 'coding'],
      icon: TableIcon,
      command: (editor: Editor, range: Range) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
          .run(),
    },
    {
      title: 'Horizontal Rule',
      description: 'Insert a horizontal divider.',
      searchTerms: ['horizontal', 'line', 'divider', 'separator'],
      icon: MinusIcon,
      command: (editor: Editor, range: Range) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run()
      },
    },
  ].filter((item) => {
    if (typeof query === 'string' && query.length > 0) {
      const search = query.toLowerCase()
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        (item.searchTerms &&
          item.searchTerms.some((term: string) => term.includes(search)))
      )
    }
    return true
  })
}

export { getSuggestionItems }
