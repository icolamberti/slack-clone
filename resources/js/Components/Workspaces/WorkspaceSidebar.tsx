import { useWorkspace } from '@/Context/WorkspaceContext'
import { useIsAdmin } from '@/Hooks/UseIsAdmin'
import { usePage } from '@inertiajs/react'
import {
  HashIcon,
  MessageSquareTextIcon,
  SendHorizonalIcon,
} from 'lucide-react'
import { useState } from 'react'
import CreateChannelModal from '../Channels/CreateChannelModal'
import SidebarItem from './SidebarItem'
import UserItem from './UserItem'
import WorkspaceHeader from './WorkspaceHeader'
import WorkspaceSection from './WorkspaceSection'

export default function () {
  const { user } = usePage().props.auth
  const { workspace } = useWorkspace()

  const isAdmin = useIsAdmin(workspace, user)

  const [openChannel, setOpenChannel] = useState(false)

  return (
    <div className='flex h-full flex-col'>
      <WorkspaceHeader />

      <div className='mt-3 flex flex-col px-2'>
        <SidebarItem
          label='Threads'
          icon={MessageSquareTextIcon}
          id='threads'
        />

        <SidebarItem
          label='Drafts & Sent'
          icon={SendHorizonalIcon}
          id='drafts'
        />
      </div>

      <WorkspaceSection
        label='Channels'
        hint='New channel'
        onNew={isAdmin ? () => setOpenChannel(true) : undefined}
      >
        <CreateChannelModal open={openChannel} setOpen={setOpenChannel} />
        {workspace.channels.map((item, index) => (
          <SidebarItem
            key={index}
            icon={HashIcon}
            label={item.name}
            id={item.id}
          />
        ))}
      </WorkspaceSection>

      <WorkspaceSection
        label='Direct messages'
        hint='New direct message'
        onNew={() => {}}
      >
        {workspace.members.map((item, index) => (
          <UserItem
            key={index}
            id={item.user_id}
            label={item.user.name}
            image={item.user.avatar}
          />
        ))}
      </WorkspaceSection>
    </div>
  )
}
