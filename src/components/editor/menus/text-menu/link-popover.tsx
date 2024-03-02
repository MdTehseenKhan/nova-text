import { ElementRef, FC, useEffect, useRef } from 'react'
import { LinkIcon } from 'lucide-react'
import { Editor } from '@tiptap/react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Toggle } from '@/components/ui/toggle'

import { LinkEditorPanel } from '../link-menu/link-editor-panel'
import { cn } from '@/utils'

interface LinkPopoverProps {
  editor: Editor
}

export const LinkPopover: FC<LinkPopoverProps> = ({ editor }) => {
  const inputRef = useRef<ElementRef<'input'>>(null)
  const isLinkActive = editor.isActive('link')

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus()
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toggle
          size={'sm'}
          className="text-muted-foreground hover:text-foreground"
        >
          <LinkIcon
            className={cn(
              'h-4 w-4 stroke-[2px] transition',
              isLinkActive && 'stroke-[3px] text-foreground'
            )}
          />
        </Toggle>
      </PopoverTrigger>

      <PopoverContent className="mt-1 w-auto shadow-none p-0 border-none">
        <LinkEditorPanel editor={editor} />
      </PopoverContent>
    </Popover>
  )
}
