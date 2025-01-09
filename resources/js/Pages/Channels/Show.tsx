import ChannelHeader from '@/Components/Channels/ChannelHeader'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/Components/Ui/resizable'
import WorkspaceSidebar from '@/Components/Workspaces/WorkspaceSidebar'
import { WorkspaceProvider } from '@/Context/WorkspaceContext'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Channel, Workspace } from '@/types/workspace'

type Props = {
  workspace: Workspace
  channel: Channel
}

export default function ({ workspace, channel }: Props) {
  return (
    <WorkspaceProvider workspace={workspace} channel={channel}>
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
            <div className='flex h-full flex-col'>
              <ChannelHeader />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </AuthenticatedLayout>
    </WorkspaceProvider>
  )
}
