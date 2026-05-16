<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="your@email.com"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">
        {{ errors.email }}
      </p>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        placeholder="••••••••"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <p v-if="errors.password" class="mt-1 text-sm text-red-600">
        {{ errors.password }}
      </p>
    </div>

    <div v-if="error" class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      {{ error }}
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
    >
      {{ isLoading ? 'Loading...' : 'Sign In' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { useAuth } from '../composable'

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

const form = reactive<FormData>({
  email: '',
  password: '',
})

const errors = reactive<FormErrors>({})
const authState = useAuth()
const { login, ...state } = authState
const { isLoading, error } = state.value

const validateForm = (): boolean => {
  errors.email = undefined
  errors.password = undefined

  if (!form.email) {
    errors.email = 'Email is required'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  }

  return !Object.keys(errors).length
}

const handleSubmit = async (): Promise<void> => {
  if (!validateForm()) {
    return
  }

  await login({
    email: form.email,
    password: form.password,
  })
}
</script>

<style scoped>
/* Пусто - стили из Tailwind */
</style>
