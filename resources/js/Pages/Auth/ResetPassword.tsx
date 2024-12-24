import Error from '@/Components/Form/Error'
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
import { useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

type Props = {
  token: string
  email: string
}

export default function ResetPassword({ token, email }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  })

  const submit: FormEventHandler = e => {
    e.preventDefault()

    post('/reset-password', {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <GuestLayout>
      <Card className='h-full w-full p-8'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle>Set your new password</CardTitle>

          <CardDescription>
            Please enter your new password below. Make sure your new password is
            strong and secure.
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-5 px-0 pb-0'>
          <form onSubmit={submit} className='flex flex-col gap-y-2.5'>
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

              <Error message={errors.email} />
            </div>

            <div>
              <Label htmlFor='password'>Password</Label>

              <Input
                id='password'
                disabled={processing}
                type='password'
                value={data.password}
                onChange={event => setData('password', event.target.value)}
                required
              />

              <Error message={errors.password} />
            </div>

            <div>
              <Label htmlFor='password_confirmation'>Confirm password</Label>

              <Input
                id='password_confirmation'
                disabled={processing}
                type='password'
                value={data.password_confirmation}
                onChange={event =>
                  setData('password_confirmation', event.target.value)
                }
                required
              />

              <Error message={errors.password_confirmation} />
            </div>

            <Button
              isLoading={processing}
              type='submit'
              className='mt-5 w-full'
              size={'lg'}
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </GuestLayout>
  )
}
