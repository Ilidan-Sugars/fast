import { getCsrfToken } from './csrf'

export async function postJson<T>(url: string, data: Record<string, any>): Promise<T> {
  const token = getCsrfToken()

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'X-CSRF-TOKEN': token } : {}),
    },
    credentials: 'same-origin',
    body: JSON.stringify(data),
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed')
    Object.assign(error, { status: response.status, body: payload })
    throw error
  }

  return payload as T
}
