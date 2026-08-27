import { useCallback, useEffect, useState } from 'react'
import {
  listNotifications,
  markAsRead as apiMarkAsRead,
  deleteNotification as apiDeleteNotification,
} from '@/api/notifications'

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { notifications: items } = await listNotifications()
      setNotifications(items)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications()
  }, [fetchNotifications])

  const markRead = useCallback(async (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    try {
      await apiMarkAsRead(id, true)
    } catch {
      // best-effort — local state already reflects the read status
    }
  }, [])

  const remove = useCallback(async (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    try {
      await apiDeleteNotification(id)
    } catch {
      // best-effort — already removed from the local view
    }
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return { notifications, loading, error, unreadCount, markRead, remove, refetch: fetchNotifications }
}
