<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#080808] flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-[#111111]">
      <h1 class="text-3xl font-semibold text-[#1b1b18] dark:text-white">Вход в админку</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-300">Введите свои данные для доступа к административной панели.</p>

      <form @submit.prevent="handleSubmit" class="mt-6 space-y-5">
        <TextInput v-model="login" label="Логин (email или имя)" placeholder="admin@example.com" required />
        <TextInput v-model="password" label="Пароль" type="password" placeholder="••••••••" required />

        <div v-if="error" class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-[#3f0d0d] dark:text-red-200">{{ error }}</div>
        <div v-if="success" class="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-[#083216] dark:text-emerald-200">{{ success }}</div>

        <Button type="submit" class="w-full">Войти</Button>
      </form>

      <p class="mt-6 text-sm text-gray-500 dark:text-gray-400">Логин: <span class="font-semibold">admin@example.com</span>, пароль: <span class="font-semibold">admin123</span>.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { postJson } from '@/shared/lib/fetch'
import Button from '@/shared/ui/Button.vue'
import TextInput from '@/shared/ui/TextInput.vue'

const login = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

const schema = z.object({
  login: z.string().min(3, 'Логин обязателен'),
  password: z.string().min(6, 'Пароль обязателен'),
})

async function handleSubmit() {
  error.value = ''
  success.value = ''

  const parsed = schema.safeParse({ login: login.value, password: password.value })
  if (!parsed.success) {
    error.value = parsed.error.errors.map((item) => item.message).join(', ')
    return
  }

  try {
    await postJson('/api/admin/login', parsed.data)
    success.value = 'Вход выполнен, перенаправление...'
    window.location.href = '/admin'
  } catch (err: any) {
    error.value = err.body?.message ?? err.message ?? 'Не удалось выполнить вход'
  }
}
</script>
