import { Toaster } from '@/Components/Ui/sonner'
import UserButton from '@/Components/UserButton'
import { usePage } from '@inertiajs/react'
import { PropsWithChildren, useEffect } from 'react'
import { toast } from 'sonner'

export default function ({ children }: PropsWithChildren) {
  const { flash } = usePage().props

  useEffect(() => {
    if (flash && flash.success) {
      toast.success(flash.success)
    }
    if (flash && flash.error) {
      toast.error(flash.error)
    }
  }, [flash])

  return (
    <div className='flex h-svh items-center justify-center bg-secondary'>
      <Toaster />

      <div className='flex flex-col items-center md:h-auto md:w-[420px]'>
        imagem {/* TODO: logo */}
        {children}
        <UserButton />
      </div>
    </div>
  )
}
