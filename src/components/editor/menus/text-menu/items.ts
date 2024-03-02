import type { Editor } from '@tiptap/react'
import type { LucideIcon } from 'lucide-react'

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListOrderedIcon,
  PilcrowIcon,
  ListTodoIcon,
  SubscriptIcon,
  SuperscriptIcon,
  AlignCenterIcon,
  BaselineIcon,
  CodeIcon,
  ListIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  HighlighterIcon,
} from 'lucide-react'

export type TextMenuItem = {
  name: string
  icon?: LucideIcon
  setCommand: <T = void>(value?: T) => void
  unsetCommand?: <T = void>(value?: T) => void
  isActive: () => boolean
  font?: string
  color?: () => string
}

export const getContentTypeItems = (editor: Editor): TextMenuItem[] => [
  {
    name: 'Paragraph',
    icon: PilcrowIcon,
    setCommand: () =>
      editor
        .chain()
        .focus()
        .lift('taskItem')
        .liftListItem('listItem')
        .setParagraph()
        .run(),
    isActive: () =>
      editor.isActive('paragraph') &&
      !editor.isActive('orderedList') &&
      !editor.isActive('bulletList') &&
      !editor.isActive('taskList'),
  },
  {
    name: 'Heading 1',
    icon: Heading1Icon,
    setCommand: () =>
      editor
        .chain()
        .focus()
        .lift('taskItem')
        .liftListItem('listItem')
        .setHeading({ level: 1 })
        .run(),
    isActive: () => editor.isActive('heading', { level: 1 }),
  },
  {
    name: 'Heading 2',
    icon: Heading2Icon,
    setCommand: () =>
      editor
        .chain()
        .focus()
        .lift('taskItem')
        .liftListItem('listItem')
        .setHeading({ level: 2 })
        .run(),
    isActive: () => editor.isActive('heading', { level: 2 }),
  },
  {
    name: 'Heading 3',
    icon: Heading3Icon,
    setCommand: () =>
      editor
        .chain()
        .focus()
        .lift('taskItem')
        .liftListItem('listItem')
        .setHeading({ level: 3 })
        .run(),
    isActive: () => editor.isActive('heading', { level: 3 }),
  },
  {
    name: 'Bullet List',
    icon: ListIcon,
    setCommand: () => editor.chain().focus().toggleBulletList().run(),
    isActive: () => editor.isActive('bulletList'),
  },
  {
    name: 'Numbered List',
    icon: ListOrderedIcon,
    setCommand: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.isActive('orderedList'),
  },
  {
    name: 'Todo List',
    icon: ListTodoIcon,
    setCommand: () => editor.chain().focus().toggleTaskList().run(),
    isActive: () => editor.isActive('taskList'),
  },
]

const fonts = [
  'Inter',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Garamond',
  'Georgia',
  'Courier',
  'Courier New',
]
export const getFontFamilyItems = (editor: Editor): TextMenuItem[] =>
  fonts.map((font: string) => ({
    font,
    name: font,
    setCommand: () => editor.chain().setFontFamily(font).run(),
    isActive: () => editor.isActive('textStyle', { fontFamily: font }),
  }))

export const getTextMenuItems = (editor: Editor): TextMenuItem[] => [
  {
    icon: BoldIcon,
    name: 'bold',
    setCommand: () => editor.chain().focus().toggleBold().run(),
    isActive: () => editor.isActive('bold'),
  },
  {
    name: 'italic',
    icon: ItalicIcon,
    setCommand: () => editor.chain().focus().toggleItalic().run(),
    isActive: () => editor.isActive('italic'),
  },
  {
    name: 'underline',
    icon: UnderlineIcon,
    setCommand: () => editor.chain().focus().toggleUnderline().run(),
    isActive: () => editor.isActive('underline'),
  },
  {
    name: 'strike',
    icon: StrikethroughIcon,
    setCommand: () => editor.chain().focus().toggleStrike().run(),
    isActive: () => editor.isActive('strike'),
  },
  {
    name: 'code',
    icon: CodeIcon,
    setCommand: () => editor.chain().focus().toggleCode().run(),
    isActive: () => editor.isActive('code'),
  },
]

export const getColorPickerItems = (editor: Editor): TextMenuItem[] => [
  {
    name: 'highlight',
    icon: HighlighterIcon,
    color: () => editor.getAttributes('highlight').color,
    setCommand: (color) =>
      editor
        .chain()
        .setHighlight({ color: color as string })
        .run(),
    unsetCommand: () => editor.chain().focus().unsetHighlight().run(),
    isActive: () => editor.isActive('highlight'),
  },
  {
    name: 'textColor',
    icon: BaselineIcon,
    color: () => editor.getAttributes('textStyle').color,
    setCommand: (color) =>
      editor
        .chain()
        .setColor(color as string)
        .run(),
    unsetCommand: () => editor.chain().focus().unsetColor().run(),
    isActive: () => editor.isActive('textStyle'),
  },
]

export const getMoreOptionsItems = (editor: Editor): TextMenuItem[] => [
  {
    name: 'subscript',
    icon: SubscriptIcon,
    setCommand: () => editor.chain().focus().toggleSubscript().run(),
    isActive: () => editor.isActive('subscript'),
  },
  {
    name: 'superscript',
    icon: SuperscriptIcon,
    setCommand: () => editor.chain().focus().toggleSuperscript().run(),
    isActive: () => editor.isActive('superscript'),
  },
  {
    name: 'alignLeft',
    icon: AlignLeftIcon,
    setCommand: () => editor.chain().focus().setTextAlign('left').run(),
    isActive: () => editor.isActive({ textAlign: 'left' }),
  },
  {
    name: 'alignCenter',
    icon: AlignCenterIcon,
    setCommand: () => editor.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.isActive({ textAlign: 'center' }),
  },
  {
    name: 'alignRight',
    icon: AlignRightIcon,
    setCommand: () => editor.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.isActive({ textAlign: 'right' }),
  },
  {
    name: 'alignLeft',
    icon: AlignJustifyIcon,
    setCommand: () => editor.chain().focus().setTextAlign('justify').run(),
    isActive: () => editor.isActive({ textAlign: 'justify' }),
  },
]
