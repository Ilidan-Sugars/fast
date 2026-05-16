/**
 * shared/lib/validators.ts
 * Функции валидации данных
 */

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePassword(password: string): boolean {
  // Минимум 8 символов, хотя бы одна буква и цифра
  return /^(?=.*[a-z])(?=.*\d).{8,}$/i.test(password)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)

    return true
  } catch {
    return false
  }
}
