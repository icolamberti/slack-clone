import { PropsWithChildren } from 'react'

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className='bg-secondary flex h-svh items-center justify-center'>
      <div className='flex flex-col items-center md:h-auto md:w-[420px]'>
        imagem {/* TODO: logo */}
        {children}
      </div>
    </div>
  )
}
