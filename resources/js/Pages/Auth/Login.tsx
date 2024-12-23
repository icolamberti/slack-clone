import { Button } from '@/Components/Ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/Ui/card'
import { Checkbox } from '@/Components/Ui/checkbox'
import { Input } from '@/Components/Ui/input'
import { Label } from '@/Components/Ui/label'
import { Separator } from '@/Components/Ui/separator'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'
import { TriangleAlert } from 'lucide-react'
import { FormEventHandler } from 'react'
import { FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'

type FormData = {
  email: string
  password: string
  remember: boolean
}

export default function () {
  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    email: '',
    password: '',
    remember: false,
  })

  const submit: FormEventHandler = e => {
    e.preventDefault()

    post('', {
      onFinish: () => reset('password'),
    })
  }

  console.log('data', data)
  return (
    <GuestLayout>
      <Card className='h-full w-full p-8'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle>Login to continue</CardTitle>

          <CardDescription>
            Use your email or another service to continue
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
            </div>

            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='remember'
                  checked={data.remember}
                  onCheckedChange={() => setData('remember', !data.remember)}
                  disabled={processing}
                />

                <Label htmlFor='remember'>Remember me</Label>
              </div>

              <Link
                href={'password.request'}
                className='text-xs text-muted-foreground hover:underline'
              >
                Forgot your password?
              </Link>
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
            <a href='/login/google'>
              <Button
                disabled={processing}
                variant={'outline'}
                size={'lg'}
                className='relative w-full'
              >
                <FcGoogle className='absolute left-2.5 top-1/2 size-5 -translate-y-1/2 transform' />
                Continue with Google
              </Button>
            </a>

            <a href='/login/github'>
              <Button
                disabled={processing}
                variant={'outline'}
                size={'lg'}
                className='relative w-full'
              >
                <FaGithub className='absolute left-2.5 top-1/2 size-5 -translate-y-1/2 transform' />
                Continue with Github
              </Button>
            </a>
          </div>

          <p className='text-xs text-muted-foreground'>
            Don't have an account?{' '}
            <Link href='register' className='text-sky-700 hover:underline'>
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </GuestLayout>
  )
}
