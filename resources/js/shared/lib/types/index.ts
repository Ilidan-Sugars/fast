/**
 * Shared Types
 *
 * Глобальные типы и интерфейсы, используемые во всем приложении.
 */

// Пример типа пользователя
export interface User {
  id: number
  name: string
  email: string
  created_at?: string
}

// Пример API Response типа
export interface ApiResponse<T> {
  data: T
  message?: string
  errors?: Record<string, string[]>
}

// Пример типа страницы
export interface Page {
  component: string
  props?: Record<string, any>
}
