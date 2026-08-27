import { useTasks } from './useTasks'
import { useCallLeads } from './useCallLeads'
import { useTelegramChats } from './useTelegramChats'

export function useNavBadges() {
  const { tasks } = useTasks()
  const { leads } = useCallLeads()
  const { chats } = useTelegramChats()

  return {
    tasks: tasks.filter((t) => !t.done).length,
    callCenter: leads.filter((l) => l.stage === 'unsorted').length,
    telegram: chats.reduce((sum, c) => sum + (c.unreadCount || 0), 0),
  }
}
