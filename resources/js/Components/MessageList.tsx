import { useWorkspace } from '@/Context/WorkspaceContext'
import { cn } from '@/Lib/utils'
import { Metadata } from '@/types/pagination'
import { Message } from '@/types/workspace'
import axios from 'axios'
import { differenceInMinutes, format, isToday, isYesterday } from 'date-fns'
import { useEffect, useState } from 'react'
import ChannelHero from './Channels/ChannelHero'
import MessageComponent from './Message'
import { Button } from './Ui/button'

type Props = {
  variant?: 'channel' | 'thread' | 'conversation'
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

const TIME_THRESHOLD = 5

export default function ({
  variant = 'channel',
  messages,
  setMessages,
}: Props) {
  const { workspace, channel } = useWorkspace()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [metadata, setMetadata] = useState<Metadata>({
    current_page: 0,
    last_page: 0,
    next_page_url: '',
    links: [],
    length: 0,
    total: 0,
  })

  const [editingId, setEditingId] = useState<string | null>(null)

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

  const groupedMessages = messages.reduce(
    (groups, message) => {
      const date = new Date(message.created_at).toDateString()
      const dateKey = format(date, 'yyyy-MM-dd')

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].unshift(message)

      return groups
    },
    {} as Record<string, Message[]>,
  )

  const onDestroyMessage = (messageId: string) => {
    setMessages(messages.filter(message => message.id !== messageId))
  }

  const updateMessages = (data: any) => {
    setMessages([
      ...messages,
      ...data.messages.data.filter(
        (newMessage: Message) =>
          !messages.some(
            (existingMessage: Message) => existingMessage.id === newMessage.id,
          ),
      ),
    ])
    setMetadata({
      current_page: data.messages.current_page,
      last_page: data.messages.last_page,
      next_page_url: data.messages.next_page_url,
      links: data.messages.links,
      length: data.messages.data.length,
      total: data.messages.total,
    })
    setHasMore(
      data.messages.current_page < data.messages.last_page ? true : false,
    )
  }

  const updateMessage = (message: Message) => {
    setMessages([message, ...messages])
  }

  const fetchData = (link = metadata.next_page_url) => {
    setIsLoading(true)

    axios
      .get(link)
      .then(res => {
        updateMessages(res.data)
      })
      .finally(() => setIsLoading(false))
  }

  window.Echo.channel(`channel.messages.${channel!.id}`).listen(
    '.message-sent',
    (e: { message: Message }) => {
      updateMessage(e.message)
    },
  )

  window.Echo.channel(`message.messages.${workspace.id}`)
    .listen('.message-updated', (e: { message: Message }) => {
      setMessages(
        messages.map(message =>
          message.id === e.message.id ? { ...message, ...e.message } : message,
        ),
      )
    })
    .listen('.message-deleted', (e: { messageId: string }) => {
      console.log(e)
      setMessages(messages.filter(message => message.id !== e.messageId))
    })

  useEffect(() => {
    fetchData(`/workspaces/${workspace.id}/messages?channel=${channel!.id}`)
  }, [])

  return (
    <div className='messages-scrollbar flex flex-1 flex-col-reverse overflow-y-auto pb-4'>
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className='relative my-2 text-center'>
            <hr className='absolute left-0 right-0 top-1/2 border-t border-gray-300' />

            <span className='relative inline-block rounded-full border border-gray-300 bg-white px-4 py-1 text-xs shadow-sm'>
              {formatDateLabel(dateKey)}
            </span>
          </div>

          {messages.map((message, index) => {
            const prevMessage = messages[index - 1]
            const isCompact =
              prevMessage &&
              prevMessage.user.id === message.user.id &&
              differenceInMinutes(
                new Date(message.created_at),
                new Date(prevMessage.created_at),
              ) < TIME_THRESHOLD

            return (
              <MessageComponent
                key={message.id}
                message={message}
                onDestroyMessage={onDestroyMessage}
                isCompact={isCompact}
                hideThreadButton={variant === 'thread'}
                isEditing={editingId === message.id}
                setEditingId={setEditingId}
              />
            )
          })}
        </div>
      ))}

      {hasMore && (
        <div className='flex items-center justify-center'>
          <Button
            onClick={() => fetchData()}
            isLoading={isLoading}
            className={cn('rounded-full', isLoading && 'size-10 p-0')}
          >
            Load more
          </Button>
        </div>
      )}

      {variant === 'channel' && <ChannelHero />}
    </div>
  )
}
