import { useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { Avatar, AvatarFallback, Button, Input } from '@/components/ui'
import { EmptyState } from '@/components/shared'
import { cn } from '@/lib/utils'
import { formatRelativeTime, initialsFromName } from '@/utils'
import { useLanguage } from '@/hooks'

export function ChatThread({ chat, onSend, onBack }) {
  const { t } = useLanguage()
  const [draft, setDraft] = useState('')

  if (!chat) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState title={t('telegram.noChatSelected')} />
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!draft.trim()) return
    onSend(draft)
    setDraft('')
  }

  return (
    <div className="flex flex-1 flex-col min-w-0">
      <div className="flex items-center gap-2.5 border-b px-4 py-3">
        {onBack && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="-ml-1 shrink-0 md:hidden"
            onClick={onBack}
            aria-label={t('telegram.backToList')}
          >
            <ArrowLeft className="size-4" />
          </Button>
        )}
        <Avatar className="size-8">
          <AvatarFallback>{initialsFromName(chat.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{chat.name}</p>
          <p className="truncate text-xs text-muted-foreground">{chat.username}</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin px-4 py-4">
        {chat.messages.map((message) => (
          <div key={message.id} className={cn('flex', message.from === 'me' ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[75%] rounded-2xl px-3.5 py-2 text-sm',
                message.from === 'me'
                  ? 'rounded-br-sm bg-primary text-primary-foreground'
                  : 'rounded-bl-sm bg-muted text-foreground'
              )}
            >
              <p>{message.text}</p>
              <p
                className={cn(
                  'mt-1 text-[10px]',
                  message.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                )}
              >
                {formatRelativeTime(message.at, t)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t p-3">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t('telegram.messagePlaceholder')}
          className="h-9"
        />
        <Button type="submit" size="icon" aria-label={t('telegram.send')}>
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  )
}
