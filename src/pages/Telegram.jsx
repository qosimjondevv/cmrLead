import { Search } from 'lucide-react'
import { PageHeader } from '@/components/shared'
import { Input } from '@/components/ui'
import { ConnectionStatusCard, ChatList, ChatThread } from '@/components/telegram'
import { useTelegramPage, useLanguage } from '@/hooks'
import { cn } from '@/lib/utils'

export default function Telegram() {
  const { t } = useLanguage()
  const {
    chats,
    search,
    setSearch,
    selectedChat,
    selectChat,
    submitMessage,
    mobileChatOpen,
    closeMobileChat,
  } = useTelegramPage()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader title={t('telegram.title')} description={t('telegram.description')} />

      <div className="min-h-0 flex-1 overflow-hidden px-4 py-4 sm:px-6">
        <div className="mb-4 max-w-md">
          <ConnectionStatusCard />
        </div>

        <div className="flex h-[calc(100%-6rem)] min-h-0 overflow-hidden rounded-lg border bg-card">
          <div
            className={cn(
              'flex w-full shrink-0 flex-col border-r md:flex md:w-72',
              mobileChatOpen && 'hidden'
            )}
          >
            <div className="border-b p-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('telegram.searchPlaceholder')}
                  className="h-9 pl-8"
                />
              </div>
            </div>
            <ChatList chats={chats} selectedChatId={selectedChat?.id} onSelect={selectChat} />
          </div>

          <div className={cn('flex min-w-0 flex-1 md:flex', !mobileChatOpen && 'hidden')}>
            <ChatThread chat={selectedChat} onSend={submitMessage} onBack={closeMobileChat} />
          </div>
        </div>
      </div>
    </div>
  )
}
