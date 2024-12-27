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
  const { data, setData, post, errors, processing, reset } = useForm({
    name: '',
  })

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    post('/workspaces/store', {
      preserveScroll: true,
      onSuccess: handleClose,
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <Label required>Workspace name</Label>
            <Input
              placeholder="e.g. 'Work', 'Personal', 'Home'"
              value={data.name}
              required
              autoFocus
              minLength={3}
              maxLength={255}
              onChange={e => setData('name', e.target.value)}
            />
            <Error message={errors.name} />
          </div>

          <div className='flex justify-end'>
            <Button isLoading={processing}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
