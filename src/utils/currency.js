export function formatMoney(value, currency = 'USD', lang = 'uz') {
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value ?? 0)
}
