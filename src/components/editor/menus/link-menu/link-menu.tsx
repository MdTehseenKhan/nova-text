import { useCallback, useState } from 'react'
import { BubbleMenu } from '@tiptap/react'

import { LinkEditorPanel } from './link-editor-panel'
import { LinkPreviewPanel } from './link-preview-panel'

import { MenuProps } from '../types'

export const LinkMenu = ({ editor, appendTo }: MenuProps): JSX.Element => {
  const [showEdit, setShowEdit] = useState(false)

  const onShowEdit = useCallback(() => setShowEdit(true), [])
  const onHideEdit = useCallback(() => setShowEdit(false), [])

  const shouldShow = useCallback(() => editor.isActive('link'), [editor])

  const bubbleMenuProps = {
    editor,
    shouldShow,
    updateDelay: 0,
    pluginKey: 'linkMenu',
    tippyOptions: {
      moveTransition: 'transform ease-out',
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      appendTo: () => {
        return appendTo?.current
      },
      onHidden: () => {
        setShowEdit(false)
      },
    },
  }

  return (
    <BubbleMenu {...bubbleMenuProps}>
      {showEdit ? (
        <LinkEditorPanel
          editor={editor}
          onSetLink={onHideEdit}
          onCancelEdit={onHideEdit}
        />
      ) : (
        <LinkPreviewPanel
          editor={editor}
          onClearLink={onHideEdit}
          onEditLink={onShowEdit}
        />
      )}
    </BubbleMenu>
  )
}

export default LinkMenu
