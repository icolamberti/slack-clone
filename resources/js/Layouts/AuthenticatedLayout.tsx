import { Toaster } from '@/Components/Ui/sonner'
import { usePage } from '@inertiajs/react'
import { PropsWithChildren, useEffect } from 'react'
import { toast } from 'sonner'
import Sidebar from './Components/Sidebar'
import Toolbar from './Components/Toolbar'

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
    <>
      <Toaster />
      <div className='h-svh'>
        <Toolbar />

        <div className='flex h-[calc(100svh-40px)]'>
          <Sidebar />

          {children}
        </div>
      </div>
    </>
  )
}
