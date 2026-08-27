export function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export function hoursAgo(n) {
  const d = new Date()
  d.setHours(d.getHours() - n)
  return d.toISOString()
}

export function formatDate(iso, lang = 'uz') {
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US'
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(new Date(iso))
}
