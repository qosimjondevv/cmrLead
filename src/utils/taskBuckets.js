function startOfDay(value) {
  const d = new Date(value)
  d.setHours(0, 0, 0, 0)
  return d
}

// Formats a local Date as YYYY-MM-DD without going through toISOString(),
// which converts to UTC and can shift the date backward by a day in
// positive-offset timezones (e.g. UTC+5).
function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function endOfWeek(date) {
  const d = startOfDay(date)
  const day = d.getDay()
  const diffToSunday = day === 0 ? 0 : 7 - day
  d.setDate(d.getDate() + diffToSunday)
  return d
}

export function getTaskBucket(dueDateIso) {
  const due = startOfDay(dueDateIso)
  const today = startOfDay(new Date())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const endThisWeek = endOfWeek(today)
  const endNextWeek = new Date(endThisWeek)
  endNextWeek.setDate(endNextWeek.getDate() + 7)

  if (due.getTime() < today.getTime()) return 'overdue'
  if (due.getTime() === today.getTime()) return 'today'
  if (due.getTime() === tomorrow.getTime()) return 'tomorrow'
  if (due.getTime() <= endThisWeek.getTime()) return 'thisWeek'
  if (due.getTime() <= endNextWeek.getTime()) return 'nextWeek'
  return 'later'
}

export function defaultDueDateForBucket(bucket) {
  const today = startOfDay(new Date())
  const d = new Date(today)
  switch (bucket) {
    case 'today':
      break
    case 'tomorrow':
      d.setDate(d.getDate() + 1)
      break
    case 'thisWeek':
      d.setDate(d.getDate() + 3)
      break
    case 'nextWeek':
      d.setDate(d.getDate() + 9)
      break
    case 'later':
      d.setDate(d.getDate() + 20)
      break
    case 'overdue':
      d.setDate(d.getDate() - 1)
      break
    default:
      break
  }
  return toDateInputValue(d)
}
