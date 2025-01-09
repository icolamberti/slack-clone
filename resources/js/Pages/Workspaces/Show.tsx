import CreateChannelModal from '@/Components/Channels/CreateChannelModal'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/Components/Ui/resizable'
import WorkspaceSidebar from '@/Components/Workspaces/WorkspaceSidebar'
import { WorkspaceProvider } from '@/Context/WorkspaceContext'
import { useIsAdmin } from '@/Hooks/UseIsAdmin'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Workspace } from '@/types/workspace'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function ({ workspace }: { workspace: Workspace }) {
  const { user } = usePage().props.auth

  const isAdmin = useIsAdmin(workspace, user)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!workspace.channels.length) {
      if (isAdmin && !open) {
        setOpen(true)
      }
    }
  }, [workspace, open, setOpen])

  return (
    <WorkspaceProvider workspace={workspace}>
      <AuthenticatedLayout>
        <ResizablePanelGroup direction='horizontal' autoSaveId='slack-layout'>
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className='bg-secondary/90'
          >
            <WorkspaceSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel minSize={20}>
            <CreateChannelModal open={open} setOpen={setOpen} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </AuthenticatedLayout>
    </WorkspaceProvider>
  )
}
