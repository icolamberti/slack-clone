import { cn } from '@/Lib/utils'

type Props = {
  message: string | undefined
  className?: string
}

export default function ({ message, className = '' }: Props) {
  return (
    <div
      className={cn(
        'text-destructive text-left text-xs font-medium',
        className,
      )}
    >
      {message}
    </div>
  )
}
