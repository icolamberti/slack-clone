import { useWorkspace } from '@/Context/WorkspaceContext'
import { format } from 'date-fns'

export default function () {
  const { channel } = useWorkspace()

  return (
    <div className='mx-5 mb-4 mt-[88px]'>
      <p className='mb-2 flex items-center text-2xl font-bold'>
        # {channel?.name}
      </p>

      <p className='mb-4 font-normal text-slate-800'>
        This channel was created on{' '}
        {format(channel!.created_at, 'MMMM do, yyyy')}. This is the very
        beginning of the <strong>{channel?.name}</strong> channel.
      </p>
    </div>
  )
}
