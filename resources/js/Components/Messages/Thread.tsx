import { useWorkspace } from '@/Context/WorkspaceContext'
import { usePanel } from '@/Hooks/UsePanel'
import { Message } from '@/types/workspace'
import { router } from '@inertiajs/react'
import { differenceInMinutes, format, isToday, isYesterday } from 'date-fns'
import { AlertTriangleIcon, XIcon } from 'lucide-react'
import Quill from 'quill'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import Editor from '../Editor'
import MessageComponent from '../Message'
import { Button } from '../Ui/button'

type Props = {
  message?: Message
}

type HandleSubmitProps = {
  body: string
  image: File | null
}

const TIME_THRESHOLD = 5

export default function ({ message }: Props) {
  const { workspace, channel } = useWorkspace()
  const { onClose } = usePanel()
  const editorRef = useRef<Quill | null>(null)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editorKey, setEditorKey] = useState(0)
  const [processing, setProcessing] = useState(false)

  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr)

    if (isToday(date)) {
      return 'Today'
    }
    if (isYesterday(date)) {
      return 'Yesterday'
    }
    return format(date, 'EEEE, MMMM d')
  }

  const groupedReplies = message?.replies.reduce(
    (groups, reply) => {
      const date = new Date(reply.created_at).toDateString()
      const dateKey = format(date, 'yyyy-MM-dd')

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].unshift(reply)

      return groups
    },
    {} as Record<string, Message[]>,
  )

  const handleSubmit = ({ body, image }: HandleSubmitProps) => {
    setProcessing(true)
    editorRef?.current?.enable(false)

    router.post(
      `/workspaces/${workspace.id}/messages`,
      { body, image, channel: channel!.id, parent_id: message?.id },
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

  if (!message) {
    return (
      <div className='flex h-full flex-col'>
        <div className='flex h-[49px] items-center justify-between border-b px-4'>
          <p className='text-lg font-bold'>Thread</p>

          <Button onClick={onClose} size={'iconSm'} variant={'ghost'}>
            <XIcon className='size-5 stroke-[1.5]' />
          </Button>
        </div>

        <div className='flex h-full flex-col items-center justify-center gap-y-2'>
          <AlertTriangleIcon className='size-5 text-muted-foreground' />

          <p className='text-sm text-muted-foreground'>Message not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-[49px] items-center justify-between border-b px-4'>
        <p className='text-lg font-bold'>Thread:</p>

        <Button onClick={onClose} size={'iconSm'} variant={'ghost'}>
          <XIcon className='size-5 stroke-[1.5]' />
        </Button>
      </div>

      <div className='messages-scrollbar flex flex-1 flex-col-reverse overflow-y-auto pb-4'>
        {Object.entries(groupedReplies || {}).map(([dateKey, replies]) => (
          <div key={dateKey}>
            <div className='relative my-2 text-center'>
              <hr className='absolute left-0 right-0 top-1/2 border-t border-gray-300' />

              <span className='relative inline-block rounded-full border border-gray-300 bg-white px-4 py-1 text-xs shadow-sm'>
                {formatDateLabel(dateKey)}
              </span>
            </div>

            {replies.map((reply, index) => {
              const prevReply = replies[index - 1]
              const isCompact =
                prevReply &&
                prevReply.user.id === reply.user.id &&
                differenceInMinutes(
                  new Date(reply.created_at),
                  new Date(prevReply.created_at),
                ) < TIME_THRESHOLD

              return (
                <MessageComponent
                  key={reply.id}
                  message={reply}
                  hideThreadButton
                  isCompact={isCompact}
                  isEditing={editingId === reply.id}
                  setEditingId={setEditingId}
                />
              )
            })}
          </div>
        ))}

        <MessageComponent
          message={message}
          hideThreadButton
          isEditing={editingId === message.id}
          setEditingId={setEditingId}
        />
      </div>

      <div className='px-4'>
        <Editor
          key={editorKey}
          variant='create'
          placeholder='Reply...'
          onSubmit={handleSubmit}
          disabled={processing}
          innerRef={editorRef}
        />
      </div>
    </div>
  )
}
