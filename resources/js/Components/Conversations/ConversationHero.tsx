import { useWorkspace } from '@/Context/WorkspaceContext'
import { Avatar, AvatarFallback, AvatarImage } from '../Ui/avatar'

export default function () {
  const { conversation } = useWorkspace()

  const avatarFallback = conversation?.user.name.charAt(0).toUpperCase()

  return (
    <div className='mx-5 mb-4 mt-[88px]'>
      <div className='mb-2 flex items-center gap-x-1'>
        <Avatar className='mr-2 size-14'>
          <AvatarImage src={conversation?.user.avatar} />

          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <p className='text-2xl font-bold'>{conversation?.user.name}</p>
      </div>

      <p className='mb-4 font-normal text-slate-800'>
        This conversation is just between you and{' '}
        <strong>{conversation?.user.name}</strong>
      </p>
    </div>
  )
}
