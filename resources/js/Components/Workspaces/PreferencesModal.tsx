import { useWorkspace } from '@/Context/WorkspaceContext'
import { useConfirm } from '@/Hooks/UseConfirm'
import { router, useForm } from '@inertiajs/react'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
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

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function ({ open, setOpen }: Props) {
  const { workspace } = useWorkspace()

  const { data, setData, patch, processing, errors } = useForm({
    name: workspace.name,
  })

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'This action is irreversible.',
  )

  const [editOpen, setEditOpen] = useState(false)

  const onDestroyHandler = async () => {
    const ok = await confirm()

    if (!ok) return

    router.delete(`/workspaces/${workspace.id}`)
    setOpen(false)
  }

  const onUpdateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    patch(`/workspaces/${workspace.id}`, {
      onSuccess: () => {
        setEditOpen(false)
      },
    })
  }

  return (
    <>
      <ConfirmDialog />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className='overflow-hidden bg-gray-50 p-0'>
          <DialogHeader className='border-b bg-white p-4'>
            <DialogTitle>{workspace.name}</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col gap-y-2 px-4 pb-4'>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className='cursor-pointer rounded-lg bg-white px-5 py-4 hover:bg-gray-50'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-semibold'>Workspace name</p>

                    <p className='text-sm font-semibold text-[#1264a3] hover:underline'>
                      Edit
                    </p>
                  </div>

                  <p className='text-sm'>{workspace.name}</p>
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
              <TrashIcon className='!size-4' />
              <p className='text-sm font-semibold'>Delete workspace</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
