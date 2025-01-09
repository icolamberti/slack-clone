import { User } from '@/types'
import { Workspace } from '@/types/workspace'
import { useMemo } from 'react'

export const useIsAdmin = (workspace: Workspace, user: User) => {
  return useMemo(() => {
    const currentMember = workspace.members.find(
      member => member.user_id === user.id,
    )

    return currentMember?.role === 'admin'
  }, [workspace, user])
}
