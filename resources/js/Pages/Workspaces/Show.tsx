import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Workspace } from '@/types/workspace'

export default function ({ workspace }: { workspace: Workspace }) {
  console.log(workspace)
  return <AuthenticatedLayout>show</AuthenticatedLayout>
}
