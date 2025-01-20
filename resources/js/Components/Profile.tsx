import { usePanel } from '@/Hooks/UsePanel'
import { User } from '@/types'
import { Link } from '@inertiajs/react'
import { AlertTriangleIcon, MailIcon, XIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './Ui/avatar'
import { Button } from './Ui/button'
import { Separator } from './Ui/separator'

type Props = {
  member?: User
}

export default function ({ member }: Props) {
  const { onClose } = usePanel()

  if (!member) {
    return (
      <div className='flex h-full flex-col'>
        <div className='flex h-[49px] items-center justify-between border-b px-4'>
          <p className='text-lg font-bold'>Profile</p>

          <Button onClick={onClose} size={'iconSm'} variant={'ghost'}>
            <XIcon className='size-5 stroke-[1.5]' />
          </Button>
        </div>

        <div className='flex h-full flex-col items-center justify-center gap-y-2'>
          <AlertTriangleIcon className='size-5 text-muted-foreground' />

          <p className='text-sm text-muted-foreground'>Profile not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-[49px] items-center justify-between border-b px-4'>
        <p className='text-lg font-bold'>Profile</p>

        <Button onClick={onClose} size={'iconSm'} variant={'ghost'}>
          <XIcon className='size-5 stroke-[1.5]' />
        </Button>
      </div>

      <div className='flex flex-col items-center justify-center p-4'>
        <Avatar className='size-full max-h-[256px] max-w-[256px]'>
          <AvatarImage src={member.avatar} />

          <AvatarFallback className='aspect-square text-6xl'>
            {member?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className='flex flex-col p-4'>
        <p className='text-xl font-bold'>{member.name}</p>
      </div>

      <Separator />

      <div className='flex flex-col p-4'>
        <p className='mb-4 text-sm font-bold'>Contact information</p>

        <div className='flex items-center gap-2'>
          <div className='flex size-9 items-center justify-center rounded-md bg-muted'>
            <MailIcon className='size-4' />
          </div>

          <div className='flex flex-col'>
            <p className='text-[13px] font-semibold text-muted-foreground'>
              Email Address
            </p>

            <Link
              href={`mailto:${member.email}`}
              className='text-sm text-[#1264a3] hover:underline'
            >
              {member.email}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
