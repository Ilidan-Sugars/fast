/**
 * features/Auth/model.ts
 */

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface User {
  id: number
  email: string
  name: string
  role: 'user' | 'admin'
}

export interface LoginPayload {
  email: string
  password: string
}
