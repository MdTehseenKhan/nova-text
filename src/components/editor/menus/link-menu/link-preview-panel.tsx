import { useCallback } from 'react'
import { Editor } from '@tiptap/react'
import { SquarePenIcon, Trash2Icon } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export type LinkPreviewPanelProps = {
  editor: Editor
  onEditLink?: () => void
  onClearLink?: () => void
}

export const LinkPreviewPanel = ({
  editor,
  onEditLink,
  onClearLink,
}: LinkPreviewPanelProps) => {
  const initialLink = () => editor.getAttributes('link').href

  const onClear = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()

    if (onClearLink) {
      onClearLink()
    }
  }, [editor, onClearLink])

  return (
    <div className="flex items-center bg-background gap-1 pl-5 p-1 rounded-lg border border-border shadow-md">
      <a
        href={initialLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline text-blue-500 hover:text-blue-600 active:text-red-500"
      >
        {initialLink()}
      </a>
      <div className="my-1">
        <Separator orientation="vertical" />
      </div>

      <Button size="sm" variant="ghost" onClick={onEditLink}>
        <SquarePenIcon className="w-4 h-4" />
      </Button>

      <Button size="sm" variant="ghost" onClick={onClear}>
        <Trash2Icon className="w-4 h-4" />
      </Button>
    </div>
  )
}
