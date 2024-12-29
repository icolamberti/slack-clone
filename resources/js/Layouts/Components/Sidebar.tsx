import UserButton from '@/Components/UserButton'
import {
  BellIcon,
  HomeIcon,
  MessagesSquareIcon,
  MoreHorizontalIcon,
} from 'lucide-react'
import SidebarButton from './SidebarButton'
import WorkspaceSwitcher from './WorkspaceSwitcher'

export default function () {
  return (
    <aside className='flex h-full w-[70px] flex-col items-center gap-y-4 bg-secondary pb-1 pt-[9px]'>
      <WorkspaceSwitcher />

      <SidebarButton
        icon={HomeIcon}
        label='Home'
        isActive={window.location.pathname.startsWith('/workspaces')}
      />
      <SidebarButton icon={MessagesSquareIcon} label='DMs' />
      <SidebarButton icon={BellIcon} label='Activity' />
      <SidebarButton icon={MoreHorizontalIcon} label='More' />

      <div className='mt-auto flex flex-col items-center justify-center gap-y-1'>
        <UserButton />
      </div>
    </aside>
  )
}
