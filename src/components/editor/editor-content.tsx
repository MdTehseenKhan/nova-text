import React, { useEffect, useMemo } from 'react'

import { useEditor, EditorContent as TiptapEditorContent } from '@tiptap/react'
// import { type EditorProps } from '@tiptap/pm/view'

import { getEditorExtensions } from './extensions'
import './styles/index.css'

// export interface EditorContentProps extends EditorProps {
export interface EditorContentProps {
  value?: string
  className?: string
}

const EditorContent: React.FC<EditorContentProps> = ({
  value = '',
  className,
}) => {
  const extensions = useMemo(() => getEditorExtensions({}), [])

  const editor = useEditor({
    extensions,
    editable: false,
    content: value,
  })

  useEffect(() => {
    editor?.commands.setContent(value)
  }, [editor, value])

  return <TiptapEditorContent editor={editor} className={className} />
}

export { EditorContent }
