import { Message } from '@/types/workspace'
import { formatDistanceToNow } from 'date-fns'
import { ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './Ui/avatar'

type Props = {
  message: Message
  onClick?: () => void
}

export default function ({ message, onClick }: Props) {
  const count = message.replies?.length || 0

  if (!count || message.parent_id) return null

  const lastReply = message.replies[0]

  return (
    <button
      onClick={onClick}
      className='group/thread-bar flex max-w-[600px] items-center justify-start rounded-md border border-transparent p-1 transition hover:border-border hover:bg-white'
    >
      <div className='flex items-center gap-2 overflow-hidden'>
        <Avatar className='size-6 shrink-0'>
          <AvatarImage src={lastReply.user.avatar} />

          <AvatarFallback>
            {lastReply.user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <span className='truncate text-xs font-bold text-sky-700 hover:underline'>
          {count} {count > 1 ? 'replies' : 'reply'}
        </span>

        <span className='block truncate text-xs text-muted-foreground group-hover/thread-bar:hidden'>
          Last reply{' '}
          {formatDistanceToNow(lastReply.created_at, {
            addSuffix: true,
          })}
        </span>

        <span className='hidden truncate text-xs text-muted-foreground group-hover/thread-bar:block'>
          View thread
        </span>
      </div>

      <ChevronRight className='ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition group-hover/thread-bar:opacity-100' />
    </button>
  )
}
