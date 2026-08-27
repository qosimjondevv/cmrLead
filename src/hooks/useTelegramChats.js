import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { INITIAL_TELEGRAM_CHATS } from '@/constants'

export function useTelegramChats() {
  const [chats, setChats] = useLocalStorage('crm-telegram-chats', INITIAL_TELEGRAM_CHATS)

  const markRead = useCallback(
    (chatId) => {
      setChats((prev) => prev.map((c) => (c.id === chatId ? { ...c, unreadCount: 0 } : c)))
    },
    [setChats]
  )

  const sendMessage = useCallback(
    (chatId, text) => {
      const message = { id: `m-${Date.now()}`, from: 'me', text, at: new Date().toISOString() }
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, message], lastMessageAt: message.at }
            : c
        )
      )
      return message
    },
    [setChats]
  )

  return { chats, markRead, sendMessage }
}
