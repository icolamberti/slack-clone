import { useWorkspace } from '@/Context/WorkspaceContext'
import { useIsAdmin } from '@/Hooks/UseIsAdmin'
import { usePage } from '@inertiajs/react'
import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from 'lucide-react'
import { useState } from 'react'
import Hint from '../Hint'
import { Button } from '../Ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../Ui/dropdown-menu'
import PreferencesModal from './PreferencesModal'

export default function () {
  const { user } = usePage().props.auth
  const { workspace } = useWorkspace()

  const [preferencesOpen, setPreferencesOpen] = useState(false)

  const isAdmin = useIsAdmin(workspace, user)

  return (
    <>
      <PreferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} />

      <div className='flex h-[49px] items-center justify-between gap-0.5 px-4'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'transparent'}
              className='w-auto overflow-hidden p-1.5 text-lg font-semibold'
              size={'sm'}
            >
              <span className='truncate'>{workspace.name}</span>

              <ChevronDownIcon className='ml-1 size-4 shrink-0' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side='bottom' align='start' className='w-64'>
            <DropdownMenuItem className='cursor-pointer capitalize'>
              <div className='relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-[#616061] text-xl font-semibold text-white'>
                {workspace.name.charAt(0).toUpperCase()}
              </div>

              <div className='flex flex-col items-start'>
                <p className='font-bold'>{workspace.name}</p>

                <p className='text-xs text-muted-foreground'>
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>

            {isAdmin && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className='cursor-pointer py-2'
                  onClick={() => {}}
                >
                  Invite people to {workspace.name}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className='cursor-pointer py-2'
                  onClick={() => setPreferencesOpen(true)}
                >
                  Preferences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='flex items-center gap-0.5'>
          <Hint label='Filter conversations' side='bottom'>
            <Button variant={'transparent'} size={'iconSm'}>
              <ListFilterIcon className='size-4' />
            </Button>
          </Hint>

          <Hint label='New message' side='bottom'>
            <Button variant={'transparent'} size={'iconSm'}>
              <SquarePenIcon className='size-4' />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  )
}
