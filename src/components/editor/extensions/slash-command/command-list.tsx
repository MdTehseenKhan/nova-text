import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/utils'
import type { SuggestionItemType } from './items'
import type { Editor, Range } from '@tiptap/core'
import { Command } from 'cmdk'

interface CommandListProps {
  items: SuggestionItemType[]
  editor: Editor
  range: Range
}

export const CommandList = ({ items, editor, range }: CommandListProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const commandListContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedIndex(0)
  }, [items])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['Enter', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
        if (e.key === 'Enter') {
          items[selectedIndex].command(editor, range)
          return true
        }
        if (e.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length)
          return true
        }
        if (e.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length)
          return true
        }
        return false
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [items, selectedIndex, setSelectedIndex])

  useLayoutEffect(() => {
    const container = commandListContainer?.current
    const item = container?.children[selectedIndex] as HTMLElement
    if (item && container) updateScrollView(container, item)
  }, [selectedIndex])

  if (items.length <= 0) return null

  return (
    <Command
      id="slash-command"
      ref={commandListContainer}
      onKeyDown={(e) => e.stopPropagation()}
      className="z-50 w-72 max-h-[330px] overflow-y-auto rounded-md border border-border bg-background px-1 py-2 shadow-md transition-all"
    >
      <Command.List>
        {items.map((item, index) => {
          return (
            <Command.Item
              key={index}
              onSelect={() => item.command(editor, range)}
              className={cn(
                'flex z-50 w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-left hover:bg-accent hover:cursor-pointer',
                index === selectedIndex && 'bg-accent'
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted-foreground/30">
                <item.icon />
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Command.Item>
          )
        })}
      </Command.List>
    </Command>
  )
}

function updateScrollView(container: HTMLElement, item: HTMLElement) {
  const containerHeight = container.offsetHeight
  const itemHeight = item ? item.offsetHeight : 0

  const top = item.offsetTop
  const bottom = top + itemHeight

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5
  }
}
