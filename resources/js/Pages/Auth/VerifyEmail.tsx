import { Button } from '@/Components/Ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/Ui/card'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({})

  const submit: FormEventHandler = e => {
    e.preventDefault()

    post('/email/verification-notification')
  }

  return (
    <GuestLayout>
      <Card className='h-full w-full p-8'>
        {status === 'verification-link-sent' ? (
          <CardContent className='space-y-5 px-0 pb-0'>
            A new verification link has been sent to the email address you
            provided during registration.
          </CardContent>
        ) : (
          <>
            <CardHeader className='px-0 pt-0'>
              <CardTitle>E-mail verification</CardTitle>

              <CardDescription>
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-5 px-0 pb-0'>
              <form onSubmit={submit} className='flex flex-col gap-y-2.5'>
                <Button
                  isLoading={processing}
                  type='submit'
                  className='w-full'
                  size={'lg'}
                >
                  Resend verification email
                </Button>

                <Link href='/logout' method='post' as='button'>
                  <Button
                    type='button'
                    variant={'outline'}
                    className='mt-5 w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive'
                  >
                    Logout
                  </Button>
                </Link>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </GuestLayout>
  )
}
