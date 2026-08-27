import { Avatar, AvatarFallback, Badge } from '@/components/ui'
import { formatRelativeTime, initialsFromName } from '@/utils'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/hooks'

export function ChatList({ chats, selectedChatId, onSelect }) {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col overflow-y-auto scrollbar-thin">
      {chats.map((chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1]
        const active = chat.id === selectedChatId
        return (
          <button
            key={chat.id}
            type="button"
            onClick={() => onSelect(chat.id)}
            className={cn(
              'flex items-center gap-2.5 border-b px-3 py-3 text-left transition-colors hover:bg-accent/50',
              active && 'bg-accent'
            )}
          >
            <Avatar className="size-9 shrink-0">
              <AvatarFallback>{initialsFromName(chat.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-foreground">{chat.name}</p>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {formatRelativeTime(chat.lastMessageAt, t)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs text-muted-foreground">{lastMessage?.text}</p>
                {chat.unreadCount > 0 && (
                  <Badge variant="default" className="ml-1 shrink-0 px-1.5 py-0 text-[10px]">
                    {chat.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
