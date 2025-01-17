import { Channel, Conversation, Workspace } from '@/types/workspace'
import { createContext, PropsWithChildren, useContext } from 'react'

interface WorkspaceContextProps {
  workspace: Workspace
  channel?: Channel
  conversation?: Conversation
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(
  undefined,
)

export const WorkspaceProvider = ({
  children,
  workspace,
  channel,
  conversation,
}: PropsWithChildren<WorkspaceContextProps>) => {
  return (
    <WorkspaceContext.Provider value={{ workspace, channel, conversation }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }
  return context
}
