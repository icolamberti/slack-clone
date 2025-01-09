import { useWorkspace } from '@/Context/WorkspaceContext'
import { useConfirm } from '@/Hooks/UseConfirm'
import { useForm } from '@inertiajs/react'
import { CopyIcon, RefreshCcwIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../Ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../Ui/dialog'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function ({ open, setOpen }: Props) {
  const { post, processing } = useForm()
  const { workspace } = useWorkspace()

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'This will deactivate the current invite code and generate a new one.',
  )

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/workspaces/${workspace.id}/join?code=${workspace.join_code.toUpperCase()}`

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success('Invite link copied to clipboard'))
  }

  const handleNewCode = async () => {
    const ok = await confirm()

    if (!ok) return

    post(`/workspaces/${workspace.id}/join/update`, {
      preserveScroll: true,
    })
  }

  return (
    <>
      <ConfirmDialog />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {workspace.name}</DialogTitle>
            <DialogDescription>
              Use the code below to invite people to your workspace
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col items-center justify-center gap-y-4 py-10'>
            <p className='text-4xl font-bold uppercase tracking-widest'>
              {workspace.join_code}
            </p>

            <Button variant={'ghost'} size={'sm'} onClick={handleCopy}>
              Copy link
              <CopyIcon className='ml-2 size-4' />
            </Button>
          </div>

          <div className='flex items-center justify-between'>
            <Button
              variant={'outline'}
              className='w-36'
              isLoading={processing}
              onClick={handleNewCode}
            >
              New code
              <RefreshCcwIcon className='ml-2 size-4' />
            </Button>

            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
