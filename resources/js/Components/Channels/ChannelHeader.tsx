import { useWorkspace } from '@/Context/WorkspaceContext'
import { useConfirm } from '@/Hooks/UseConfirm'
import { useIsAdmin } from '@/Hooks/UseIsAdmin'
import { router, useForm, usePage } from '@inertiajs/react'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import Error from '../Form/Error'
import { Button } from '../Ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Ui/dialog'
import { Input } from '../Ui/input'
import { Label } from '../Ui/label'

export default function () {
  const { user } = usePage().props.auth
  const { workspace, channel } = useWorkspace()

  const isAdmin = useIsAdmin(workspace, user)

  const { data, setData, patch, processing, errors } = useForm({
    name: channel!.name,
  })

  const [ConfirmDialog, confirm] = useConfirm(
    'Delete this channel?',
    'You are about to delete this channel. This action is irreversible.',
  )

  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const onDestroyHandler = async () => {
    const ok = await confirm()

    if (!ok) return

    router.delete(`/workspaces/${workspace.id}/channels/${channel!.id}`)
    setOpen(false)
  }

  const onUpdateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    patch(`/workspaces/${workspace.id}/channels/${channel!.id}`, {
      onSuccess: () => {
        setEditOpen(false)
      },
    })
  }

  return (
    <>
      <ConfirmDialog />

      <div className='flex h-[49px] items-center overflow-hidden border-b bg-white px-4'>
        {channel!.name === 'general' || !isAdmin ? (
          <Button
            variant={'ghost'}
            size={'sm'}
            className='w-auto overflow-hidden px-2 text-lg font-semibold'
          >
            <span className='truncate'># {channel!.name}</span>
          </Button>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant={'ghost'}
                size={'sm'}
                className='w-auto overflow-hidden px-2 text-lg font-semibold'
              >
                <span className='truncate'># {channel!.name}</span>

                <FaChevronDown className='ml-2 size-2.5' />
              </Button>
            </DialogTrigger>

            <DialogContent className='overflow-hidden bg-gray-50 p-0'>
              <DialogHeader className='border-b bg-white p-4'>
                <DialogTitle># {channel!.name}</DialogTitle>
              </DialogHeader>

              <div className='flex flex-col gap-y-2 px-4 pb-4'>
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <div className='cursor-pointer rounded-lg bg-white px-5 py-4 hover:bg-gray-50'>
                      <div className='flex items-center justify-between'>
                        <p className='text-sm font-semibold'>Channel name</p>

                        <p className='text-sm font-semibold text-[#1264a3] hover:underline'>
                          Edit
                        </p>
                      </div>

                      <p className='text-sm'>{channel!.name}</p>
                    </div>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rename this workspace</DialogTitle>
                    </DialogHeader>

                    <form className='space-y-4' onSubmit={onUpdateHandler}>
                      <div>
                        <Label htmlFor='name'>Workspace name</Label>
                        <Input
                          value={data.name}
                          onChange={e => setData('name', e.target.value)}
                          required
                          minLength={3}
                          maxLength={80}
                          placeholder="e.g. 'Work', 'Personal', 'Home'"
                        />
                        <Error message={errors.name} />
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>

                        <Button isLoading={processing} className='w-24'>
                          Save
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  variant={'outline'}
                  size={'lg'}
                  className='w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground'
                  onClick={() => onDestroyHandler()}
                >
                  <TrashIcon className='size-4' />
                  <p className='text-sm font-semibold'>Delete channel</p>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  )
}
