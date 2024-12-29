import { WorkspaceProvider } from '@/Context/WorkspaceContext'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Workspace } from '@/types/workspace'

export default function ({ workspace }: { workspace: Workspace }) {
  return (
    <WorkspaceProvider workspace={workspace}>
      <AuthenticatedLayout>show</AuthenticatedLayout>
    </WorkspaceProvider>
  )
}
