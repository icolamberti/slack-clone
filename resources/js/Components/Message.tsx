import { Message } from '@/types/workspace'
import { format, isToday, isYesterday } from 'date-fns'
import Hint from './Hint'
import Renderer from './Renderer'
import Thumbnail from './Thumbnail'
import { Avatar, AvatarFallback, AvatarImage } from './Ui/avatar'

type Props = {
  message: Message
  isCompact: boolean
}

export default function ({ message, isCompact }: Props) {
  const avatarFallback = message.user.name.charAt(0).toUpperCase()

  const formatFullTime = (date: Date) => {
    return `${isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MMM d, yyyy')} at ${format(date, 'h:mm:ss a')}`
  }

  const isUpdated = message.updated_at !== message.created_at

  if (isCompact) {
    return (
      <div className='group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60'>
        <div className='flex items-start gap-2'>
          <Hint label={formatFullTime(new Date(message.created_at))}>
            <button className='w-[40px] text-center text-xs leading-[22px] text-muted-foreground opacity-0 hover:underline group-hover:opacity-100'>
              {format(new Date(message.created_at), 'hh:mm')}
            </button>
          </Hint>

          <div className='flex w-full flex-col'>
            <Renderer value={message.body} />

            <Thumbnail url={message.image} />

            {isUpdated && (
              <span className='text-xs text-muted-foreground'>(edited)</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60'>
      <div className='flex items-start gap-2'>
        <button>
          <Avatar>
            <AvatarImage src={message.user.avatar} />

            <AvatarFallback className='bg-sky-500 text-xs text-white'>
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </button>

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
        </div>
      </div>
    </div>
  )
}
