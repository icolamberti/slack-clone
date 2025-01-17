import {
  MessageSquareTextIcon,
  PencilIcon,
  SmileIcon,
  TrashIcon,
} from 'lucide-react'
import EmojiPopover from './EmojiPopover'
import Hint from './Hint'
import { Button } from './Ui/button'

type Props = {
  isAuthor: boolean
  isPending: boolean
  handleEdit: () => void
  handleDelete: () => void
  handleThread: () => void
  handleReaction: (value: string) => void
  hideThreadButton?: boolean
}

export default function ({
  isAuthor,
  isPending,
  handleEdit,
  handleDelete,
  handleThread,
  handleReaction,
  hideThreadButton,
}: Props) {
  return (
    <div className='absolute right-5 top-0'>
      <div className='rounded-md border bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100'>
        <EmojiPopover
          hint='Add reaction'
          onEmojiSelect={emoji => handleReaction(emoji.native)}
        >
          <Button variant={'ghost'} size={'iconSm'} isLoading={isPending}>
            <SmileIcon className='size-4' />
          </Button>
        </EmojiPopover>

        {!hideThreadButton && (
          <Hint label='Reply in thread'>
            <Button
              variant={'ghost'}
              size={'iconSm'}
              isLoading={isPending}
              onClick={handleThread}
            >
              <MessageSquareTextIcon className='size-4' />
            </Button>
          </Hint>
        )}

        {isAuthor && (
          <>
            <Hint label='Edit message'>
              <Button
                variant={'ghost'}
                size={'iconSm'}
                isLoading={isPending}
                onClick={handleEdit}
              >
                <PencilIcon className='size-4' />
              </Button>
            </Hint>

            <Hint label='Delete message'>
              <Button
                variant={'ghost'}
                size={'iconSm'}
                isLoading={isPending}
                onClick={handleDelete}
              >
                <TrashIcon className='size-4' />
              </Button>
            </Hint>
          </>
        )}
      </div>
    </div>
  )
}
