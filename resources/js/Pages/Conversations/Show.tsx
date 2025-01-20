import ChatInput from '@/Components/Conversations/ChatInput'
import ConversationHeader from '@/Components/Conversations/ConversationHeader'
import MessageList from '@/Components/MessageList'
import Profile from '@/Components/Profile'
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
import { User } from '@/types'
import { Conversation, Message, Workspace } from '@/types/workspace'
import { useState } from 'react'

type Props = {
  workspace: Workspace
  conversation: Conversation
}

export default function ({ workspace, conversation }: Props) {
  const { parentMessageId, profileMemberId } = usePanel()

  const [messages, setMessages] = useState<Message[]>([])

  const listenChannel = `conversation.messages.${conversation.id}`

  const showPanel = !!parentMessageId || !!profileMemberId

  const message = messages.find(message => message.id === parentMessageId)

  const member = messages.reduce(
    (foundUser: User | undefined, message: Message) => {
      if (foundUser) return foundUser
      if (message.user.id === profileMemberId) return message.user
      const replyUser = message.replies?.find(
        reply => reply.user.id === profileMemberId,
      )?.user
      return replyUser || undefined
    },
    undefined,
  )

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
    <WorkspaceProvider workspace={workspace} conversation={conversation}>
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
              <ConversationHeader onClick={() => {}} />

              <MessageList
                key={conversation.id}
                variant='conversation'
                listenChannel={listenChannel}
                messages={messages}
                setMessages={setMessages}
                onDestroyMessage={onDestroyMessage}
              />

              <ChatInput placeholder={`Message ${conversation.user.name}`} />
            </div>
          </ResizablePanel>

          {showPanel && (
            <>
              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={29} minSize={20}>
                {parentMessageId && (
                  <Thread
                    message={message}
                    onDestroyMessage={onDestroyMessage}
                  />
                )}

                {profileMemberId && <Profile member={member} />}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </AuthenticatedLayout>
    </WorkspaceProvider>
  )
}
