import { memo, useCallback } from 'react'
import { BubbleMenu } from '@tiptap/react'
import {
  ArrowDownToLineIcon,
  ArrowUpToLineIcon,
  Trash2Icon,
} from 'lucide-react'

import { MenuProps, ShouldShowProps } from '../types'
import { isRowGripSelected } from './utils'

export const TableRowMenu = memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const tableRowMenuItems = [
      {
        name: 'Add row before',
        icon: ArrowUpToLineIcon,
        command: () => editor.chain().focus().addRowBefore().run(),
      },
      {
        name: 'Add row after',
        icon: ArrowDownToLineIcon,
        command: () => editor.chain().focus().addRowAfter().run(),
      },
      {
        name: 'Delete row',
        icon: Trash2Icon,
        command: () => editor.chain().focus().deleteRow().run(),
      },
      {
        name: 'Delete table',
        icon: Trash2Icon,
        command: () => editor.chain().focus().deleteTable().run(),
      },
    ]

    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state || !from) {
          return false
        }
        return isRowGripSelected({ editor, view, state, from })
      },
      [editor]
    )

    return (
      <BubbleMenu
        editor={editor}
        pluginKey="tableRowMenu"
        updateDelay={0}
        tippyOptions={{
          moveTransition: 'transform ease-out',
          appendTo: () => {
            return appendTo?.current
          },
          placement: 'auto-start',
          popperOptions: {
            modifiers: [{ name: 'flip', enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <div className="z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-muted-foreground shadow-md">
          {tableRowMenuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex gap-2 items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={item.command}
            >
              <item.icon className="w-4 h-4 stroke-[2px]" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </BubbleMenu>
    )
  }
)

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
