import { useWorkspace } from '@/Context/WorkspaceContext'
import { useConfirm } from '@/Hooks/UseConfirm'
import { cn } from '@/Lib/utils'
import { Message } from '@/types/workspace'
import { router, usePage } from '@inertiajs/react'
import { format, isToday, isYesterday } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'
import Editor from './Editor'
import Hint from './Hint'
import MessageToolbar from './MessageToolbar'
import Reactions from './Reactions'
import Renderer from './Renderer'
import Thumbnail from './Thumbnail'
import { Avatar, AvatarFallback, AvatarImage } from './Ui/avatar'

type Props = {
  message: Message
  isCompact: boolean
  hideThreadButton: boolean
  isEditing: boolean
  setEditingId: (id: number | null) => void
}

export default function ({
  message,
  isCompact,
  hideThreadButton,
  isEditing,
  setEditingId,
}: Props) {
  const { user } = usePage().props.auth
  const { workspace } = useWorkspace()

  const [ConfirmDialog, confirm] = useConfirm(
    'Delete message',
    'Are you sure you want to delete this message? This cannot be undone.',
  )

  const [updateProcessing, setUpdateProcessing] = useState(false)
  const [destroyProcessing, setDestroyProcessing] = useState(false)

  const isAuthor = message.user.id === user.id

  const formatFullTime = (date: Date) => {
    return `${isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MMM d, yyyy')} at ${format(date, 'h:mm:ss a')}`
  }

  const isUpdated = message.updated_at !== message.created_at

  const handleReaction = (value: string) => {
    router.post(
      `/workspaces/${workspace.id}/messages/${message.id}/reactions`,
      { value: value },
      {
        preserveScroll: true,
        onError: () => {
          toast.error('Failed to toggle reaction')
        },
      },
    )
  }

  const handleUpdate = ({ body }: { body: string }) => {
    setUpdateProcessing(true)

    router.patch(
      `/workspaces/${workspace.id}/messages/${message.id}`,
      { body },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Message updated')
          setEditingId(null)
        },
        onError: () => {
          toast.error('Failed to update message')
        },
        onFinish: () => {
          setUpdateProcessing(false)
        },
      },
    )
  }

  const handleDestroy = async () => {
    const ok = await confirm()

    if (!ok) return

    setDestroyProcessing(true)
    router.post(
      `/workspaces/${workspace.id}/messages/${message.id}`,
      {
        _method: 'delete',
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Message deleted')

          // TODO: Close thread if opened
        },
        onError: () => {
          toast.error('Failed to delete message')
        },
        onFinish: () => {
          setDestroyProcessing(false)
        },
      },
    )
  }

  if (isCompact) {
    return (
      <>
        <ConfirmDialog />

        <div
          className={cn(
            'group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60',
            isEditing && 'bg-[#f2c74433] hover:bg-[#f2c74433]',
            destroyProcessing &&
              'origin-bottom scale-y-0 transform bg-rose-500/50 transition-all duration-200',
          )}
        >
          <div className='flex items-start gap-2'>
            <Hint label={formatFullTime(new Date(message.created_at))}>
              <button className='w-[40px] text-center text-xs leading-[22px] text-muted-foreground opacity-0 hover:underline group-hover:opacity-100'>
                {format(new Date(message.created_at), 'hh:mm')}
              </button>
            </Hint>

            {isEditing ? (
              <div className='h-full w-full'>
                <Editor
                  onSubmit={handleUpdate}
                  disabled={updateProcessing}
                  defaultValue={JSON.parse(message.body)}
                  onCancel={() => setEditingId(null)}
                  variant='edit'
                />
              </div>
            ) : (
              <div className='flex w-full flex-col'>
                <Renderer value={message.body} />

                <Thumbnail url={message.image} />

                {isUpdated && (
                  <span className='text-xs text-muted-foreground'>
                    (edited)
                  </span>
                )}

                <Reactions
                  reactions={message.reactions}
                  onChange={handleReaction}
                />
              </div>
            )}
          </div>

          {!isEditing && (
            <MessageToolbar
              isAuthor={isAuthor}
              isPending={updateProcessing}
              handleEdit={() => setEditingId(message.id)}
              handleThread={() => {}}
              handleDelete={handleDestroy}
              handleReaction={handleReaction}
              hideThreadButton={hideThreadButton}
            />
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <ConfirmDialog />

      <div
        className={cn(
          'group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60',
          isEditing && 'bg-[#f2c74433] hover:bg-[#f2c74433]',
          destroyProcessing &&
            'origin-bottom scale-y-0 transform bg-rose-500/50 transition-all duration-200',
        )}
      >
        <div className='flex items-start gap-2'>
          <button>
            <Avatar>
              <AvatarImage src={message.user.avatar} />

              <AvatarFallback className='bg-sky-500 text-xs text-white'>
                {message.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>

          {isEditing ? (
            <div className='h-full w-full'>
              <Editor
                onSubmit={handleUpdate}
                disabled={updateProcessing}
                defaultValue={JSON.parse(message.body)}
                onCancel={() => setEditingId(null)}
                variant='edit'
              />
            </div>
          ) : (
            <div className='flex w-full flex-col overflow-hidden'>
              <div className='text-sm'>
                <button
                  onClick={() => {}}
                  className='font-bold text-primary hover:underline'
                >
                  {message.user.name}
                </button>

                <span>&nbsp;&nbsp;</span>

                <Hint label={formatFullTime(new Date(message.created_at))}>
                  <button className='text-xs text-muted-foreground hover:underline'>
                    {format(new Date(message.created_at), 'h:mm a')}
                  </button>
                </Hint>
              </div>

              <Renderer value={message.body} />

              <Thumbnail url={message.image} />

              {isUpdated && (
                <span className='text-xs text-muted-foreground'>(edited)</span>
              )}

              <Reactions
                reactions={message.reactions}
                onChange={handleReaction}
              />
            </div>
          )}
        </div>

        {!isEditing && (
          <MessageToolbar
            isAuthor={isAuthor}
            isPending={false}
            handleEdit={() => setEditingId(message.id)}
            handleThread={() => {}}
            handleDelete={handleDestroy}
            handleReaction={handleReaction}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
    </>
  )
}
