export function formatRelativeTime(iso, t) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return t('header.justNow')
  if (minutes < 60) return `${minutes} ${t('header.minutesAgo')}`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ${t('header.hoursAgo')}`
  const days = Math.floor(hours / 24)
  return `${days} ${t('header.daysAgo')}`
}
