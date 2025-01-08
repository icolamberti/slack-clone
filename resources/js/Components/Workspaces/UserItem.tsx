import { useWorkspace } from '@/Context/WorkspaceContext'
import { cn } from '@/Lib/utils'
import { Link } from '@inertiajs/react'
import { cva, VariantProps } from 'class-variance-authority'
import { Avatar, AvatarFallback, AvatarImage } from '../Ui/avatar'
import { Button } from '../Ui/button'

const userItemVariants = cva(
  'flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-[#f9edfc]',
        active: 'text-[#481349] bg-white/90 hover:bg-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type Props = {
  id: string
  label: string
  image?: string
  variant?: VariantProps<typeof userItemVariants>['variant']
}

export default function ({ id, label, image, variant }: Props) {
  const { workspace } = useWorkspace()

  const avatarFallback = label.charAt(0).toUpperCase()

  return (
    <Button
      variant={'transparent'}
      className={cn(userItemVariants({ variant: variant }))}
      size={'sm'}
      asChild
    >
      <Link href={`/workspaces/${workspace.id}/member/${id}`}>
        <Avatar className='mr-1 size-5 rounded-md'>
          <AvatarImage src={image} />

          <AvatarFallback className='rounded-md bg-sky-500 text-xs text-white'>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>

        <span className='truncate text-sm'>{label}</span>
      </Link>
    </Button>
  )
}
