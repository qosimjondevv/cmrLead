import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { INITIAL_TASKS } from '@/constants'

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('crm-tasks', INITIAL_TASKS)

  const createTask = useCallback(
    (task) => {
      const newTask = {
        id: `t-${Date.now()}`,
        done: false,
        createdAt: new Date().toISOString(),
        ...task,
      }
      setTasks((prev) => [newTask, ...prev])
      return newTask
    },
    [setTasks]
  )

  const toggleTask = useCallback(
    (id) => {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
    },
    [setTasks]
  )

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id))
    },
    [setTasks]
  )

  return { tasks, createTask, toggleTask, deleteTask }
}
