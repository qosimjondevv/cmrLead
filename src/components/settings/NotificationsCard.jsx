import { Card, CardHeader, CardTitle, CardDescription, CardContent, Switch } from '@/components/ui'
import { useLanguage } from '@/hooks'

export function NotificationsCard({ notifDeals, onNotifDealsChange, notifTasks, onNotifTasksChange }) {
  const { t } = useLanguage()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.notificationsTitle')}</CardTitle>
        <CardDescription>{t('settings.notificationsDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">{t('settings.newDealNotif')}</p>
            <p className="text-xs text-muted-foreground">{t('settings.newDealNotifDesc')}</p>
          </div>
          <Switch checked={notifDeals} onCheckedChange={onNotifDealsChange} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">{t('settings.taskReminders')}</p>
            <p className="text-xs text-muted-foreground">{t('settings.taskRemindersDesc')}</p>
          </div>
          <Switch checked={notifTasks} onCheckedChange={onNotifTasksChange} />
        </div>
      </CardContent>
    </Card>
  )
}
