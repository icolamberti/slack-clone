import { useQueryState } from 'nuqs'

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] = useQueryState('parentMessageId')

  const onOpenMessage = (messageId: string) => {
    setParentMessageId(messageId)
  }

  const onClose = () => {
    setParentMessageId(null)
  }

  return {
    parentMessageId,
    onOpenMessage,
    onClose,
  }
}
