import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/shared'
import { Button } from '@/components/ui'
import { TaskColumn, TaskModal } from '@/components/tasks'
import { TASK_BUCKETS } from '@/constants'
import { useTasksPage, useLanguage } from '@/hooks'

export default function Tasks() {
  const { t } = useLanguage()
  const {
    deals,
    tasksByBucket,
    totalCount,
    dealNameById,
    modalOpen,
    setModalOpen,
    defaultDueDate,
    openCreate,
    submitTask,
    handleToggle,
    handleDelete,
  } = useTasksPage()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title={t('tasks.title')}
        description={t('tasks.description')}
        actions={
          <div className="flex items-center gap-3">
            <span className="hidden rounded-md bg-muted px-3 py-1.5 text-sm sm:block">
              <span className="font-semibold text-foreground">{totalCount}</span>{' '}
              <span className="text-muted-foreground">{t('tasks.taskCountSuffix')}</span>
            </span>
            <Button onClick={() => openCreate('today')} className="gap-1.5">
              <Plus className="size-4" />
              {t('tasks.newTask')}
            </Button>
          </div>
        }
      />

      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin px-4 py-4 sm:px-6">
        <div className="flex h-full items-start gap-4">
          {TASK_BUCKETS.map((bucket) => (
            <TaskColumn
              key={bucket}
              bucket={bucket}
              tasks={tasksByBucket[bucket]}
              dealNameById={dealNameById}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onCreate={openCreate}
            />
          ))}
        </div>
      </div>

      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        deals={deals}
        defaultDueDate={defaultDueDate}
        onSubmit={submitTask}
      />
    </div>
  )
}
