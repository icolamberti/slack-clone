import { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Ui/tooltip'

type Props = {
  label: string
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

export default function ({ label, children, side, align }: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent
          side={side}
          align={align}
          className='border border-white/5 bg-black text-white'
        >
          <p className='text-xs font-medium'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
