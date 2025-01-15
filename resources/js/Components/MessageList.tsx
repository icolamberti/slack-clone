import { Message } from '@/types/workspace'
import { differenceInMinutes, format, isToday, isYesterday } from 'date-fns'
import { useState } from 'react'
import ChannelHero from './Channels/ChannelHero'
import MessageComponent from './Message'

type Props = {
  messages: Message[]
  variant?: 'channel' | 'thread' | 'conversation'
}

const TIME_THRESHOLD = 5

export default function ({ messages, variant = 'channel' }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null)

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
                isCompact={isCompact}
                hideThreadButton={variant === 'thread'}
                isEditing={editingId === message.id}
                setEditingId={setEditingId}
              />
            )
          })}
        </div>
      ))}
      {variant === 'channel' && <ChannelHero />}
    </div>
  )
}
