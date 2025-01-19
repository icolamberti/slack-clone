import { useWorkspace } from '@/Context/WorkspaceContext'
import { usePage } from '@inertiajs/react'
import { FaChevronDown } from 'react-icons/fa6'
import { Avatar, AvatarFallback, AvatarImage } from '../Ui/avatar'
import { Button } from '../Ui/button'

type Props = {
  onClick?: () => void
}

export default function ({ onClick }: Props) {
  const { user } = usePage().props.auth
  const { workspace, conversation } = useWorkspace()

  const avatarFallback = conversation!.user.name.charAt(0).toUpperCase()

  return (
    <div className='flex h-[49px] items-center overflow-hidden border-b bg-white px-4'>
      <Button
        variant={'ghost'}
        className='w-auto overflow-hidden px-2 text-lg font-semibold'
        size={'sm'}
        onClick={onClick}
      >
        <Avatar className='mr-2 size-6'>
          <AvatarImage src={conversation!.user.avatar} />

          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <span className='truncate'>{conversation!.user.name}</span>

        <FaChevronDown className='ml-2 size-2.5' />
      </Button>
    </div>
  )
}
