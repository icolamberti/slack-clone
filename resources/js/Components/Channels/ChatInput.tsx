import { useWorkspace } from '@/Context/WorkspaceContext'
import { useForm } from '@inertiajs/react'
import Quill from 'quill'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import Editor from '../Editor'

type Props = {
  placeholder: string
}

type HandleSubmitProps = {
  body: string
  image: File | null
}

export default function ({ placeholder }: Props) {
  const { workspace, channel } = useWorkspace()
  const { data, setData, post, processing } = useForm<HandleSubmitProps>({
    body: '',
    image: null,
  })
  const editorRef = useRef<Quill | null>(null)

  const [editorKey, setEditorKey] = useState(0)

  const handleSubmit = ({ body, image }: HandleSubmitProps) => {
    console.log({ body, image })

    setData('body', body)
    setData('image', image)

    post(`/workspaces/${workspace.id}/channels/${channel!.id}/messages`, {
      preserveScroll: true,
      onSuccess: () => {
        setEditorKey(prev => prev + 1)
      },
      onError: () => {
        toast.error('Failed to send message.')
      },
    })
  }

  return (
    <div className='px-5'>
      <Editor
        key={editorKey}
        variant='create'
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={processing}
        innerRef={editorRef}
      />
    </div>
  )
}
