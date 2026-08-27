import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Avatar, AvatarFallback } from '@/components/ui'
import { userById, formatDate } from '@/utils'
import { useLanguage } from '@/hooks'

export function UpcomingTasksList({ tasks }) {
  const { t, lang } = useLanguage()
  return (
    <Card className="mt-4">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{t('dashboard.upcomingTasks')}</CardTitle>
        <Link to="/tasks" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          {t('dashboard.viewAll')} <ArrowRight className="size-3" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {tasks.length === 0 ? (
          <p className="px-4 pb-4 text-sm text-muted-foreground">{t('dashboard.noPendingTasks')}</p>
        ) : (
          <div className="divide-y">
            {tasks.map((task) => {
              const assignee = userById(task.assignee)
              return (
                <div key={task.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="size-1.5 shrink-0 rounded-full bg-primary" />
                  <p className="min-w-0 flex-1 truncate text-sm text-foreground">{task.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatDate(task.dueDate, lang)}</span>
                  <Avatar className="size-6 shrink-0">
                    <AvatarFallback className="text-[10px]">{assignee?.initials}</AvatarFallback>
                  </Avatar>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
