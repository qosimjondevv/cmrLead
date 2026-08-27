import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui'
import { USERS } from '@/constants'
import { useLanguage, useTaskForm } from '@/hooks'

export function TaskModal({ open, onOpenChange, deals, defaultDueDate, onSubmit }) {
  const { t } = useLanguage()
  const { form, updateField, error, handleSubmit } = useTaskForm({ open, defaultDueDate, onSubmit })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('tasks.createTaskTitle')}</DialogTitle>
            <DialogDescription>{t('tasks.createTaskDescription')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 px-6 py-5">
            <div className="space-y-1.5">
              <Label htmlFor="task-title">{t('tasks.titleLabel')}</Label>
              <Input
                id="task-title"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder={t('tasks.titlePlaceholder')}
                aria-invalid={Boolean(error)}
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="task-deal">{t('tasks.relatedDeal')}</Label>
              <Select value={form.dealId} onValueChange={(v) => updateField('dealId', v)}>
                <SelectTrigger id="task-deal">
                  <SelectValue placeholder={t('common.none')} />
                </SelectTrigger>
                <SelectContent>
                  {deals.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="task-assignee">{t('tasks.assigneeLabel')}</Label>
                <Select value={form.assignee} onValueChange={(v) => updateField('assignee', v)}>
                  <SelectTrigger id="task-assignee">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {USERS.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="task-due">{t('tasks.dueDateLabel')}</Label>
                <Input
                  id="task-due"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => updateField('dueDate', e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('tasks.createBtn')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
