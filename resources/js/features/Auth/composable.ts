/**
 * features/Auth/composable.ts
 * Composable для работы с авторизацией
 */

import { ref } from 'vue'

import { API } from '@/shared/config/api'
import { postJson } from '@/shared/lib/fetch'

import type { User, LoginPayload, AuthState } from './model'

export function useAuth() {
  const state = ref<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  })

  const login = async (payload: LoginPayload): Promise<User | null> => {
    state.value.isLoading = true
    state.value.error = null

    try {
      const user = await postJson<User>(API.LOGIN, payload)
      state.value.user = user

      return user
    } catch (error) {
      state.value.error = error instanceof Error ? error.message : 'Login failed'

      return null
    } finally {
      state.value.isLoading = false
    }
  }

  const logout = async (): Promise<void> => {
    state.value.isLoading = true

    try {
      await postJson(API.LOGOUT, {})
      state.value.user = null
    } catch (error) {
      state.value.error = error instanceof Error ? error.message : 'Logout failed'
    } finally {
      state.value.isLoading = false
    }
  }

  return {
    ...state,
    login,
    logout,
  }
}
