import { cn } from '@/Lib/utils'

export default function ({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <svg
        viewBox='0 0 50 50'
        xmlns='http://www.w3.org/2000/svg'
        className='animate-spin-slow mx-auto aspect-square h-full drop-shadow'
      >
        <circle
          cx='25'
          cy='25'
          r='20'
          className={cn('fill-none stroke-[5px]', className)}
          style={{
            strokeLinecap: 'round',
            animation: 'dash 1.75s ease-in-out infinite',
          }}
        ></circle>
      </svg>
    </div>
  )
}
