import { usePanel } from '@/Hooks/UsePanel'
import { Message } from '@/types/workspace'
import { AlertTriangleIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import MessageComponent from '../Message'
import { Button } from '../Ui/button'

type Props = {
  message?: Message
}

export default function ({ message }: Props) {
  const { onClose } = usePanel()

  const [editingId, setEditingId] = useState<string | null>(null)

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

      <MessageComponent
        message={message}
        hideThreadButton
        isEditing={editingId === message.id}
        setEditingId={setEditingId}
      />
    </div>
  )
}
