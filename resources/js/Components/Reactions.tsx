import { cn } from '@/Lib/utils'
import { Reaction } from '@/types/workspace'
import { usePage } from '@inertiajs/react'
import { MdOutlineAddReaction } from 'react-icons/md'
import EmojiPopover from './EmojiPopover'
import Hint from './Hint'

type Props = {
  reactions: Reaction[]
  onChange: (value: string) => void
}

export default function ({ reactions, onChange }: Props) {
  const { user } = usePage().props.auth

  const groupedReactions = reactions.reduce(
    (groups, reaction) => {
      if (!groups[reaction.value]) {
        groups[reaction.value] = []
      }
      groups[reaction.value].push(reaction)
      return groups
    },
    {} as Record<string, Reaction[]>,
  )

  if (!reactions.length) {
    return null
  }

  return (
    <div className='my-1 flex items-center gap-1'>
      {Object.entries(groupedReactions || {}).map(([group, reactions]) => (
        <Hint
          key={group}
          label={`${reactions.length} ${reactions.length === 1 ? 'person' : 'people'} reacted with ${group}`}
        >
          <button
            className={cn(
              'flex h-6 items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 px-2 text-slate-800',
              reactions.some(reaction => reaction.user_id === user.id) &&
                'border-blue-500 bg-blue-100/70 text-white',
            )}
            onClick={() => onChange(group)}
          >
            {group}
            <span
              className={cn(
                'text-xs font-semibold text-muted-foreground',
                reactions.some(reaction => reaction.user_id === user.id) &&
                  'text-blue-500',
              )}
            >
              {reactions.length}
            </span>
          </button>
        </Hint>
      ))}

      <EmojiPopover
        hint='Add reaction'
        onEmojiSelect={emoji => onChange(emoji.native)}
      >
        <button className='flex h-7 items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 px-3 text-slate-800 hover:border-slate-500'>
          <MdOutlineAddReaction className='size-4' />
        </button>
      </EmojiPopover>
    </div>
  )
}
