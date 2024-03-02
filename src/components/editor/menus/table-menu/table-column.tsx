import { memo, useMemo, useCallback } from 'react'
import { BubbleMenu } from '@tiptap/react'
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  Trash2Icon,
} from 'lucide-react'

import { isColumnGripSelected } from './utils'
import { MenuProps, ShouldShowProps } from '../types'

export const TableColumnMenu = memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const tableColumnMenuItems = useMemo(
      () => [
        {
          name: 'Add column before',
          icon: ArrowLeftToLineIcon,
          command: () => editor.chain().focus().addColumnBefore().run(),
        },
        {
          name: 'Add column after',
          icon: ArrowRightToLineIcon,
          command: () => editor.chain().focus().addColumnAfter().run(),
        },
        {
          name: 'Delete column',
          icon: Trash2Icon,
          command: () => editor.chain().focus().deleteColumn().run(),
        },
        {
          name: 'Delete table',
          icon: Trash2Icon,
          command: () => editor.chain().focus().deleteTable().run(),
        },
      ],
      [editor]
    )

    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state) {
          return false
        }
        return isColumnGripSelected({ editor, view, state, from: from || 0 })
      },
      [editor]
    )

    return (
      <BubbleMenu
        editor={editor}
        pluginKey="tableColumnMenu"
        updateDelay={0}
        tippyOptions={{
          moveTransition: 'transform ease-out',
          appendTo: () => {
            return appendTo?.current
          },
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: 'flip', enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <div className="z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-muted-foreground shadow-md">
          {tableColumnMenuItems.map((item, index) => (
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

TableColumnMenu.displayName = 'TableColumnMenu'

export default TableColumnMenu
