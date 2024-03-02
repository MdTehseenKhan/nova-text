import { useMemo } from 'react'
import { BubbleMenu, BubbleMenuProps } from '@tiptap/react'

import { ColorPopover } from './color-popover'
import { LinkPopover } from './link-popover'

import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'
import { TextMenuDropdown } from './text-menu-dropdown'
import MoreOptionsPopover from './more-options-popover'

import {
  getColorPickerItems,
  getContentTypeItems,
  getFontFamilyItems,
  getMoreOptionsItems,
  getTextMenuItems,
} from './items'

import isCustomNodeSelected from '../../utils/is-custom-node-selected'
import isTextSelected from '../../utils/is-text-selected'

import type { MenuProps } from '../types'
import { cn } from '@/utils'

export const TextMenu: React.FC<MenuProps> = ({ editor }) => {
  const contentTypeItems = useMemo(() => getContentTypeItems(editor), [editor])
  const fontFamilyItems = useMemo(() => getFontFamilyItems(editor), [editor])
  const textMenuItems = useMemo(() => getTextMenuItems(editor), [editor])
  const colorPickerItems = useMemo(() => getColorPickerItems(editor), [editor])
  const moreOptionsItems = useMemo(() => getMoreOptionsItems(editor), [editor])

  const bubbleMenuProps: Omit<BubbleMenuProps, 'children'> = {
    editor,
    updateDelay: 100,
    pluginKey: 'textMenu',
    tippyOptions: {
      moveTransition: 'transform ease-out',
      popperOptions: { placement: 'top-start' },
    },
    shouldShow: ({ view, from }) => {
      if (!view) {
        return false
      }
      const domAtPos = view.domAtPos(from || 0).node as HTMLElement
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement
      const node = nodeDOM || domAtPos

      if (isCustomNodeSelected(editor, node)) {
        return false
      }
      return isTextSelected({ editor })
    },
  }

  return (
    <BubbleMenu {...bubbleMenuProps}>
      <div
        className="
          relative
          flex 
          gap-1
          w-fit
          rounded 
          border 
          border-border 
          bg-background
          shadow-md
          p-1
        "
      >
        <TextMenuDropdown items={contentTypeItems} />

        <TextMenuDropdown items={fontFamilyItems} />

        <div className="my-1">
          <Separator orientation="vertical" />
        </div>

        <div className="flex gap-1">
          {textMenuItems.map(
            (textMenuItem, index) =>
              textMenuItem.icon && (
                <Toggle
                  key={index}
                  size={'sm'}
                  pressed={textMenuItem.isActive()}
                  onPressedChange={textMenuItem.setCommand}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <textMenuItem.icon
                    className={cn(
                      'w-4 h-4 stroke-[2px] transition',
                      textMenuItem.isActive() && 'stroke-[3px] text-foreground'
                    )}
                  />
                </Toggle>
              )
          )}
        </div>

        <LinkPopover editor={editor} />

        <ColorPopover items={colorPickerItems} />

        <MoreOptionsPopover items={moreOptionsItems} />
      </div>
    </BubbleMenu>
  )
}
