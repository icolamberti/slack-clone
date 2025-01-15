import ChannelHeader from '@/Components/Channels/ChannelHeader'
import ChatInput from '@/Components/Channels/ChatInput'
import MessageList from '@/Components/MessageList'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/Components/Ui/resizable'
import WorkspaceSidebar from '@/Components/Workspaces/WorkspaceSidebar'
import { WorkspaceProvider } from '@/Context/WorkspaceContext'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Channel, Message, Workspace } from '@/types/workspace'

type Props = {
  workspace: Workspace
  channel: Channel
  messages: Message[]
}

export default function ({ workspace, channel, messages }: Props) {
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

              <MessageList messages={messages} />

              <ChatInput placeholder={`Message # ${channel!.name}`} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </AuthenticatedLayout>
    </WorkspaceProvider>
  )
}
