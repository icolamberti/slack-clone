import { useWorkspace } from '@/Context/WorkspaceContext'
import { router } from '@inertiajs/react'
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
  const editorRef = useRef<Quill | null>(null)

  const [editorKey, setEditorKey] = useState(0)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = ({ body, image }: HandleSubmitProps) => {
    setProcessing(true)
    editorRef?.current?.enable(false)

    router.post(
      `/workspaces/${workspace.id}/messages`,
      { body, image, channel: channel!.id },
      {
        preserveScroll: true,
        onSuccess: () => {
          setEditorKey(prev => prev + 1)
        },
        onError: () => {
          toast.error('Failed to send message.')
        },
        onFinish: () => {
          editorRef?.current?.enable(true)
          setProcessing(false)
        },
      },
    )
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
