import type {
  SuggestionProps,
  SuggestionKeyDownProps,
} from '@tiptap/suggestion'
import { ReactRenderer } from '@tiptap/react'
import { CommandList } from './command-list'
import { popup } from './slash-command'

export const renderItems = () => {
  let component: any

  return {
    onStart: (props: SuggestionProps) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      })

      popup?.[0].setProps({
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
      })

      popup?.[0].show()
    },

    onUpdate(props: SuggestionProps) {
      component?.updateProps(props)

      popup?.[0].setProps({
        getReferenceClientRect: props.clientRect,
      })
    },

    onKeyDown(props: SuggestionKeyDownProps) {
      if (props.event.key === 'Escape') {
        popup?.[0].hide()
        return true
      }

      if (!popup?.[0].state.isShown) {
        popup?.[0].show()
      }

      return component?.ref?.onKeyDown(props)
    },

    onExit() {
      popup?.[0].hide()
      component?.destroy()
    },
  }
}
