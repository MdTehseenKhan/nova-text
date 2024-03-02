import { useCallback, useMemo, useState } from 'react'
import { CheckIcon, LinkIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Editor } from '@tiptap/react'

export type LinkEditorPanelProps = {
  editor: Editor
  onSetLink?: () => void
  onCancelEdit?: () => void
}

export const LinkEditorPanel = ({
  editor,
  onSetLink,
  onCancelEdit,
}: LinkEditorPanelProps) => {
  const initialLink = useMemo(() => editor.getAttributes('link').href, [editor])

  const [link, setLink] = useState<string>(initialLink || '')

  const isValidLink = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(link), [link])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }

  const handleSetLink = useCallback(() => {
    if (!isValidLink) return

    if (link !== initialLink) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: link, target: '_blank' })
        .run()
    }
    if (onSetLink) {
      onSetLink()
    }
  }, [link, isValidLink, onSetLink, editor, initialLink])

  return (
    <div className="flex gap-2 p-2 bg-background rounded-lg shadow-md">
      <Input
        type="url"
        value={link}
        onChange={handleChange}
        placeholder="Enter URL"
        leadingIcon={<LinkIcon className="mr-2 stroke-[2px]" />}
        className="[&>input]:w-44"
      />

      {onCancelEdit && (
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={onCancelEdit}
        >
          <XIcon className="w-4 h-4 stroke-[2px]" />
        </Button>
      )}

      <Button
        size="sm"
        onClick={handleSetLink}
        type="button"
        disabled={!isValidLink}
      >
        <CheckIcon className="w-4 h-4 stroke-[2px]" />
      </Button>
    </div>
  )
}
