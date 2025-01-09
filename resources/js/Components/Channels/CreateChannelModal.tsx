import { useWorkspace } from '@/Context/WorkspaceContext'
import { useForm } from '@inertiajs/react'
import Error from '../Form/Error'
import { Button } from '../Ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Ui/dialog'
import { Input } from '../Ui/input'
import { Label } from '../Ui/label'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function ({ open, setOpen }: Props) {
  const { workspace } = useWorkspace()

  const { data, setData, post, errors, processing, reset } = useForm({
    name: '',
  })

  const handleClose = () => {
    reset()
    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
    setData('name', value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post(`/workspaces/${workspace.id}/channels`, {
      preserveScroll: true,
      onSuccess: handleClose,
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <Label htmlFor='name' required>
              Name
            </Label>
            <Input
              value={data.name}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={80}
              placeholder='e.g. plan-budget'
            />
            <Error message={errors.name} />
          </div>

          <div className='flex justify-end'>
            <Button isLoading={processing} className='w-20'>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
