import { useWorkspace } from '@/Context/WorkspaceContext'
import { cn } from '@/Lib/utils'
import { Link } from '@inertiajs/react'
import { cva, VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { IconType } from 'react-icons/lib'
import { Button } from '../Ui/button'

const sidebarItemVariants = cva(
  'flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden',
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
  label: string
  id: string
  icon: LucideIcon | IconType
  variant?: VariantProps<typeof sidebarItemVariants>['variant']
}

export default function ({ label, id, icon: Icon, variant }: Props) {
  const { workspace } = useWorkspace()

  return (
    <Link href={`/workspaces/${workspace.id}/channels/${id}`}>
      <Button
        className={cn('w-full', sidebarItemVariants({ variant: variant }))}
        variant={'transparent'}
        size={'sm'}
      >
        <Icon className='mr-1 size-3.5 shrink-0' />

        <span className='truncate text-sm'>{label}</span>
      </Button>
    </Link>
  )
}
