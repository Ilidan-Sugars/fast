/**
 * shared/lib/index.ts
 * Экспорты утилит и хелперов
 */

export { postJson, getJson } from './fetch.ts'
export { validateEmail, validatePassword, validateUrl } from './validators.ts'
export { formatDate, formatCurrency, truncate } from './formatters.ts'
