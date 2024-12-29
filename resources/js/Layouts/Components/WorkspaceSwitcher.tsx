import { Button } from '@/Components/Ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/Ui/dropdown-menu'
import CreateWorkspaceModal from '@/Components/Workspaces/CreateWorkspaceModal'
import { useWorkspace } from '@/Context/WorkspaceContext'
import { Link, usePage } from '@inertiajs/react'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

export default function () {
  const { user } = usePage().props.auth
  const { workspace } = useWorkspace()

  const [open, setOpen] = useState(false)

  const filteredWorkspaces = user.workspaces.filter(
    filteredWorkspace => filteredWorkspace.id !== workspace.id,
  )

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className='relative size-9 overflow-hidden bg-[#ababad] text-xl font-semibold text-slate-800 hover:bg-[#ababad]/80'>
            {workspace.name.charAt(0).toUpperCase()}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side='bottom' align='start' className='w-64'>
          <Link href={`/workspaces/${workspace.id}`}>
            <DropdownMenuItem className='cursor-pointer flex-col items-start justify-start capitalize'>
              {workspace.name}

              <span className='text-xs text-muted-foreground'>
                Active workspace
              </span>
            </DropdownMenuItem>
          </Link>

          {filteredWorkspaces.map(workspace => (
            <Link key={workspace.id} href={`/workspaces/${workspace.id}`}>
              <DropdownMenuItem className='cursor-pointer overflow-hidden capitalize'>
                <div className='relative mr-2 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black/65 text-lg font-semibold text-white'>
                  {workspace.name.charAt(0).toUpperCase()}
                </div>

                <p className='truncate'>{workspace.name}</p>
              </DropdownMenuItem>
            </Link>
          ))}

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setOpen(true)}
          >
            <div className='relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-black/5 text-lg font-semibold text-slate-800'>
              <PlusIcon />
            </div>
            Create a new workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateWorkspaceModal open={open} setOpen={setOpen} />
    </>
  )
}
