import { useQueryState } from 'nuqs'

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] = useQueryState('parentMessageId')
  const [profileMemberId, setProfileMemberId] = useQueryState('profileMemberId')

  const onOpenProfile = (memberId: string) => {
    setProfileMemberId(memberId)
    setParentMessageId(null)
  }

  const onOpenMessage = (messageId: string) => {
    setParentMessageId(messageId)
    setProfileMemberId(null)
  }

  const onClose = () => {
    setParentMessageId(null)
    setProfileMemberId(null)
  }

  return {
    profileMemberId,
    onOpenProfile,
    parentMessageId,
    onOpenMessage,
    onClose,
  }
}
