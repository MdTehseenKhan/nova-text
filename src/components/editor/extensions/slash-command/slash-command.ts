import { Extension } from '@tiptap/core'
import { PluginKey } from '@tiptap/pm/state'
import Suggestion from '@tiptap/suggestion'
import tippy from 'tippy.js'

import { getSuggestionItems } from './items'
import { renderItems } from './render'

const extensionName = 'slashCommand'
let popup: any

const SlashCommand = Extension.create({
  name: extensionName,

  onCreate() {
    popup = tippy('body', {
      interactive: true,
      trigger: 'manual',
      placement: 'bottom-start',
      theme: 'slash-command',
      maxWidth: '16rem',
      offset: [16, 8],
      popperOptions: {
        strategy: 'fixed',
        modifiers: [{ name: 'flip', enabled: false }],
      },
    })
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        allowSpaces: true,
        startOfLine: true,
        pluginKey: new PluginKey(extensionName),
        command: ({ editor, range, props }) => {
          const { view } = editor
          props.command(editor, range)
          view.focus()
        },
        items: getSuggestionItems,
        render: renderItems,
      }),
    ]
  },
})

export { SlashCommand, extensionName, popup }
