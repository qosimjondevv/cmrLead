import { useMemo, useState } from 'react'
import { useTelegramChats } from './useTelegramChats'

export function useTelegramPage() {
  const { chats, markRead, sendMessage } = useTelegramChats()
  const [search, setSearch] = useState('')
  const [selectedChatId, setSelectedChatId] = useState(chats[0]?.id ?? null)
  const [mobileChatOpen, setMobileChatOpen] = useState(false)

  const sorted = useMemo(
    () => [...chats].sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)),
    [chats]
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter(
      (c) => c.name.toLowerCase().includes(q) || c.username.toLowerCase().includes(q)
    )
  }, [sorted, search])

  const selectedChat = chats.find((c) => c.id === selectedChatId) ?? sorted[0] ?? null

  function selectChat(chatId) {
    setSelectedChatId(chatId)
    markRead(chatId)
    setMobileChatOpen(true)
  }

  function closeMobileChat() {
    setMobileChatOpen(false)
  }

  function submitMessage(text) {
    if (!selectedChat || !text.trim()) return
    sendMessage(selectedChat.id, text.trim())
  }

  const totalUnread = chats.reduce((sum, c) => sum + (c.unreadCount || 0), 0)

  return {
    chats: filtered,
    search,
    setSearch,
    selectedChat,
    selectChat,
    submitMessage,
    totalUnread,
    mobileChatOpen,
    closeMobileChat,
  }
}
