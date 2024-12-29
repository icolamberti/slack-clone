import { Workspace } from '@/types/workspace'
import { createContext, ReactNode, useContext } from 'react'

interface WorkspaceContextProps {
  workspace: Workspace
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(
  undefined,
)

export const WorkspaceProvider = ({
  children,
  workspace,
}: {
  children: ReactNode
  workspace: Workspace
}) => {
  return (
    <WorkspaceContext.Provider value={{ workspace }}>
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
