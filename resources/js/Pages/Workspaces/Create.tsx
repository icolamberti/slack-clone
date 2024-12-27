import CreateWorkspaceModal from '@/Components/Workspaces/CreateWorkspaceModal'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function () {
  const { user } = usePage().props.auth

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (user.workspaces.length === 0) {
      setOpen(true)
    }
  }, [user.workspaces, open, setOpen])

  return (
    <AuthenticatedLayout>
      <CreateWorkspaceModal open={open} setOpen={setOpen} />
    </AuthenticatedLayout>
  )
}
