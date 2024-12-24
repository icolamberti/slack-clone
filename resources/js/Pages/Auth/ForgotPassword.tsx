import { Button } from '@/Components/Ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/Ui/card'
import { Input } from '@/Components/Ui/input'
import { Label } from '@/Components/Ui/label'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'
import { TriangleAlert } from 'lucide-react'
import { FormEventHandler } from 'react'

export default function ({ status = '' }: { status: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  })

  const submit: FormEventHandler = e => {
    e.preventDefault()

    post('')
  }

  return (
    <GuestLayout>
      <Card className='h-full w-full p-8'>
        {status ? (
          <CardContent className='px-0 pb-0'>{status}</CardContent>
        ) : (
          <>
            <CardHeader className='px-0 pt-0'>
              <CardTitle>Forgot your password?</CardTitle>

              <CardDescription>
                No problem. Just let us know your email address and we will
                email you a password reset link that will allow you to choose a
                new one.
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-5 px-0 pb-0'>
              <form onSubmit={submit} className='flex flex-col gap-y-2.5'>
                {errors.email && (
                  <div className='mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
                    <TriangleAlert className='size-4' />

                    <p>{errors.email}</p>
                  </div>
                )}

                <div>
                  <Label htmlFor='email'>Email</Label>

                  <Input
                    id='email'
                    disabled={processing}
                    value={data.email}
                    onChange={event => setData('email', event.target.value)}
                    type='email'
                    required
                  />
                </div>

                <div className='flex justify-end'>
                  <Link
                    href='/login'
                    className='text-xs text-muted-foreground hover:underline'
                  >
                    Remembered your password?
                  </Link>
                </div>

                <Button
                  isLoading={processing}
                  type='submit'
                  className='mt-5 w-full'
                  size={'lg'}
                >
                  Email password reset link
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </GuestLayout>
  )
}
