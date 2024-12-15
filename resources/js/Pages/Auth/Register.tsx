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
import { Separator } from '@/Components/Ui/separator'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { FaFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'

export default function () {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit: FormEventHandler = e => {
    e.preventDefault()

    post('', {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <GuestLayout>
      <Card className='h-full w-full p-8'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle>Register to continue</CardTitle>

          <CardDescription>
            Use your email or another service to continue
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-5 px-0 pb-0'>
          <form onSubmit={submit} className='flex flex-col gap-y-2.5'>
            <div>
              <Label htmlFor='name'>Name</Label>

              <Input
                id='name'
                disabled={false}
                value={data.name}
                onChange={event => setData('name', event.target.value)}
                required
              />

              <Error message={errors.name} />
            </div>

            <div>
              <Label htmlFor='email'>Email</Label>

              <Input
                id='email'
                disabled={false}
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
                disabled={false}
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
                disabled={false}
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
              Continue
            </Button>
          </form>

          <Separator />

          <div className='flex flex-col gap-y-2.5'>
            <Button
              disabled={false}
              variant={'outline'}
              size={'lg'}
              className='relative w-full'
            >
              <FcGoogle className='absolute left-2.5 top-1/2 size-5 -translate-y-1/2 transform' />
              Continue with Google
            </Button>

            <Button
              disabled={false}
              variant={'outline'}
              size={'lg'}
              className='relative w-full'
            >
              <FaFacebook className='absolute left-2.5 top-1/2 size-5 -translate-y-1/2 transform text-blue-600' />
              Continue with Facebook
            </Button>
          </div>

          <p className='text-muted-foreground text-xs'>
            Already have an account?{' '}
            <Link href='login' className='text-sky-700 hover:underline'>
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </GuestLayout>
  )
}
