/**
 * shared/lib/formatters.ts
 * Функции форматирования данных
 */

export function formatDate(date: string | Date, locale = 'ru-RU'): string {
  return new Date(date).toLocaleDateString(locale)
}

export function formatCurrency(value: number, currency = 'RUB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
  }).format(value)
}

export function truncate(text: string, length: number): string {
  return text.length > length ? `${text.slice(0, length)}...` : text
}
