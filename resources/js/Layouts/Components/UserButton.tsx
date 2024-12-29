import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/Ui/dropdown-menu'
import { Link, usePage } from '@inertiajs/react'
import { LogOutIcon } from 'lucide-react'

export default function () {
  const { user } = usePage().props.auth

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='relative outline-none'>
        <Avatar className='size-10 transition hover:opacity-75'>
          <AvatarImage alt={user.name} src={user.avatar} />
          <AvatarFallback className='bg-sky-500 text-white'>
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='center' side='right' className='w-60'>
        <Link href='/logout' method='post'>
          <DropdownMenuItem className='h-10 cursor-pointer'>
            <LogOutIcon className='mr-2 size-4' />
            Logout
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
