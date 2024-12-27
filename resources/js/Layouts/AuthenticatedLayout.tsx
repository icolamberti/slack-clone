import UserButton from '@/Components/UserButton'
import { PropsWithChildren } from 'react'

export default function ({ children }: PropsWithChildren) {
  return (
    <div className='flex h-svh items-center justify-center bg-secondary'>
      <div className='flex flex-col items-center md:h-auto md:w-[420px]'>
        imagem {/* TODO: logo */}
        {children}
        <UserButton />
      </div>
    </div>
  )
}
