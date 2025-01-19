import ChannelHeader from '@/Components/Channels/ChannelHeader'
import ChatInput from '@/Components/Channels/ChatInput'
import MessageList from '@/Components/MessageList'
import Thread from '@/Components/Thread'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/Components/Ui/resizable'
import WorkspaceSidebar from '@/Components/Workspaces/WorkspaceSidebar'
import { WorkspaceProvider } from '@/Context/WorkspaceContext'
import { usePanel } from '@/Hooks/UsePanel'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Channel, Message, Workspace } from '@/types/workspace'
import { useState } from 'react'

type Props = {
  workspace: Workspace
  channel: Channel
}

export default function ({ workspace, channel }: Props) {
  const { parentMessageId } = usePanel()

  const [messages, setMessages] = useState<Message[]>([])

  const listenChannel = `channel.messages.${channel.id}`

  const showPanel = !!parentMessageId

  const message = messages.find(message => message.id === parentMessageId)

  const onDestroyMessage = (messageId: string) => {
    setMessages(
      messages
        .filter(message => message.id !== messageId)
        .map(message => ({
          ...message,
          replies: message.replies
            ? message.replies.filter(reply => reply.id !== messageId)
            : [],
        })),
    )
  }

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

              <MessageList
                listenChannel={listenChannel}
                messages={messages}
                setMessages={setMessages}
                onDestroyMessage={onDestroyMessage}
              />

              <ChatInput placeholder={`Message # ${channel!.name}`} />
            </div>
          </ResizablePanel>

          {showPanel && (
            <>
              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={29} minSize={20}>
                <Thread message={message} onDestroyMessage={onDestroyMessage} />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </AuthenticatedLayout>
    </WorkspaceProvider>
  )
}
