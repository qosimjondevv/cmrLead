import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { TASK_BUCKETS } from '@/constants'
import { getTaskBucket, defaultDueDateForBucket } from '@/utils'
import { useTasks } from './useTasks'
import { useDeals } from './useDeals'
import { useLanguage } from './useLanguage'

export function useTasksPage() {
  const { t } = useLanguage()
  const { tasks, createTask, toggleTask, deleteTask } = useTasks()
  const { deals } = useDeals()
  const [modalOpen, setModalOpen] = useState(false)
  const [defaultBucket, setDefaultBucket] = useState('today')

  const dealNameById = useMemo(() => Object.fromEntries(deals.map((d) => [d.id, d.title])), [deals])

  const activeTasks = useMemo(
    () => tasks.filter((task) => !task.done).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
    [tasks]
  )

  const tasksByBucket = useMemo(() => {
    const map = {}
    for (const bucket of TASK_BUCKETS) map[bucket] = []
    for (const task of activeTasks) {
      const bucket = getTaskBucket(task.dueDate)
      if (map[bucket]) map[bucket].push(task)
    }
    return map
  }, [activeTasks])

  function handleToggle(id) {
    toggleTask(id)
    toast.success(t('tasks.taskCompleted'))
  }

  function handleDelete(id) {
    deleteTask(id)
    toast.success(t('tasks.taskDeleted'))
  }

  function openCreate(bucket = 'today') {
    setDefaultBucket(bucket)
    setModalOpen(true)
  }

  function submitTask(values) {
    createTask(values)
    toast.success(t('tasks.taskCreated'))
    setModalOpen(false)
  }

  return {
    deals,
    tasksByBucket,
    totalCount: activeTasks.length,
    dealNameById,
    modalOpen,
    setModalOpen,
    defaultDueDate: defaultDueDateForBucket(defaultBucket),
    openCreate,
    submitTask,
    handleToggle,
    handleDelete,
  }
}
