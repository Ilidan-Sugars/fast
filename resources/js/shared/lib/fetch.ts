/**
 * shared/lib/fetch.ts
 * Утилиты для API запросов
 */

interface FetchOptions extends RequestInit {
  timeout?: number
}

/**
 * POST запрос с JSON телом
 */
export async function postJson<T = unknown>(
  url: string,
  data: Record<string, any>,
  options?: FetchOptions
): Promise<T> {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token || '',
      ...options?.headers,
    },
    body: JSON.stringify(data),
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))

    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

/**
 * GET запрос
 */
export async function getJson<T = unknown>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return response.json()
}
