# Introduction

A simple editor but a value add feature to your next product. Stay tuned there is more to come. It is a WYSIWYG editor.

Enjoy 🚀

[View Demo](https://nova-text.vercel.app)

[Bug Report here](https://www.github.com/MdTehseenKhan/nova-text/issues)

NPM Package: [https://www.npmjs.com/package/nova-text](https://www.npmjs.com/package/nova-text)

<br />

## Installation

To use Nova Text in your project, you can run the following command to install the `nova-text`:

```bash
npm i nova-text
```

Here is an example of how you can use it in your project.

```tsx App.tsx
import { useState } from 'react'
import { Editor, EditorContent } from 'nova-text/editor'

export default function App() {
  const [value, setValue] = useState<string>('')
  const onChange = (value: string) => setValue(value)

  // OR you can efficiently use it with react-hook-form with zod validation.

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-3xl font-bold">Nova Text Editor Example</h1>

      <Editor
        charactersLimit={5000}
        value={value}
        onChange={onChange}
        className="
          min-h-[150px]
          rounded-md
          border
          border-input
          bg-transparent
          px-3
          py-2
          text-sm
          shadow-sm
        "
      />

      <EditorContent value={value} />
    </div>
  )
}
```

One of the use-cases is to use it as a textarea. The value of editor will be in HTML string, which can be used in the `<EditorContent />` component.
