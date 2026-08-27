import { createApiClient } from './httpClient'

const client = createApiClient(import.meta.env.VITE_NOTIFICATIONS_API_URL)

export async function listNotifications(params = {}) {
  const res = await client.get('', { per_page: 20, ...params })
  return { notifications: res?.data ?? [], pagination: res?.pagination, meta: res?.meta }
}

export async function markAsRead(notificationId, read = true) {
  return client.patch('', { notification_id: notificationId, read })
}

export async function deleteNotification(notificationId) {
  return client.delete('', { notification_id: notificationId })
}
