import { FC, useMemo, useRef } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
// import { type EditorProps as TiptapEditorProps } from '@tiptap/pm/view'

import { TableColumnMenu, TableRowMenu } from './menus/table-menu'
import { getEditorExtensions } from './extensions'
import { TextMenu, LinkMenu } from './menus'
import { cn } from '@/utils'

import './styles/index.css'

// export interface EditorProps extends TiptapEditorProps {
export interface EditorProps {
  value?: string
  className?: string
  placeholder?: string
  charactersLimit?: number | null
  onChange?: (value: string) => void
}

const Editor: FC<EditorProps> = ({
  className,
  placeholder,
  charactersLimit,
  value = '',
  onChange,
}) => {
  const menuContainerRef = useRef<HTMLDivElement | null>(null)
  const extensions = useMemo(
    () =>
      getEditorExtensions({
        placeholder,
        charactersLimit,
      }),
    [placeholder, charactersLimit]
  )

  const editor = useEditor({
    extensions,
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          'w-full focus-visible:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        ),
      },
      handleDOMEvents: {
        keydown: (_view, event) => {
          // prevent default event listeners from firing when slash command is active
          if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
            const slashCommand = document.querySelector('#slash-command')
            if (slashCommand) {
              return true
            }
          }
        },
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML())
      }
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div ref={menuContainerRef}>
      <EditorContent editor={editor} />

      <TextMenu editor={editor} />
      <LinkMenu editor={editor} appendTo={menuContainerRef} />
      <TableRowMenu editor={editor} appendTo={menuContainerRef} />
      <TableColumnMenu editor={editor} appendTo={menuContainerRef} />

      {charactersLimit && (
        <div className="text-xs mt-2 text-muted-foreground">
          {editor.storage.characterCount.characters()}/{charactersLimit}{' '}
          characters
        </div>
      )}
    </div>
  )
}

export { Editor }
