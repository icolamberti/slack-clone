import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/Components/Ui/resizable'
import WorkspaceSidebar from '@/Components/Workspaces/WorkspaceSidebar'
import { WorkspaceProvider } from '@/Context/WorkspaceContext'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Workspace } from '@/types/workspace'

export default function ({ workspace }: { workspace: Workspace }) {
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

          <ResizablePanel minSize={20}>Show</ResizablePanel>
        </ResizablePanelGroup>
      </AuthenticatedLayout>
    </WorkspaceProvider>
  )
}
