import Quill from 'quill'
import { useRef } from 'react'
import Editor from '../Editor'

type Props = {
  placeholder: string
}

export default function ({ placeholder }: Props) {
  const editorRef = useRef<Quill | null>(null)

  return (
    <div className='px-5'>
      <Editor
        variant='create'
        placeholder={placeholder}
        onSubmit={() => {}}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  )
}
