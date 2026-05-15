<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#080808] px-4 py-10">
    <div class="mx-auto w-full max-w-5xl space-y-8">
      <div class="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-[#111111] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-semibold text-[#1b1b18] dark:text-white">Админ-панель</h1>
          <p class="mt-1 text-gray-600 dark:text-gray-300">Здесь можно создавать услуги и вакансии.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button @click="logout" class="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-900 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">Выйти</button>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside class="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#111111]">
          <nav class="space-y-3">
            <button
              class="w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition hover:bg-gray-100 dark:hover:bg-gray-900"
              :class="{ 'bg-gray-100 dark:bg-gray-900': activeTab === 'service' }"
              @click="activeTab = 'service'"
            >
              Создание услуги
            </button>
            <button
              class="w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition hover:bg-gray-100 dark:hover:bg-gray-900"
              :class="{ 'bg-gray-100 dark:bg-gray-900': activeTab === 'vacancy' }"
              @click="activeTab = 'vacancy'"
            >
              Создание вакансии
            </button>
          </nav>
        </aside>

        <section class="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-[#111111]">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 class="text-2xl font-semibold text-[#1b1b18] dark:text-white">{{ activeTabTitle }}</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Создавайте записи через безопасный API.</p>
            </div>

            <div v-if="error" class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-[#3f0d0d] dark:text-red-200">{{ error }}</div>
            <div v-if="success" class="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-[#083216] dark:text-emerald-200">{{ success }}</div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <template v-if="activeTab === 'service'">
                <TextInput v-model="serviceForm.name" label="Имя" placeholder="service-unique-name" required />
                <TextInput v-model="serviceForm.title" label="Название услуги" placeholder="Разработка сайта" required />
                <TextArea v-model="serviceForm.description" label="Описание" placeholder="Краткое описание услуги" required />
              </template>

              <template v-else>
                <TextInput v-model="vacancyForm.title" label="Название" placeholder="Frontend-разработчик" required />
                <TextArea v-model="vacancyForm.requirements" label="Требования" placeholder="Знание Vue и TS" required />
              </template>

              <Button type="submit">Сохранить</Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { z } from 'zod'
import { postJson } from '@/shared/lib/fetch'
import Button from '@/shared/ui/Button.vue'
import TextInput from '@/shared/ui/TextInput.vue'
import TextArea from '@/shared/ui/TextArea.vue'

const activeTab = ref<'service' | 'vacancy'>('service')
const success = ref('')
const error = ref('')

const serviceForm = ref({ name: '', title: '', description: '' })
const vacancyForm = ref({ title: '', requirements: '' })

const serviceSchema = z.object({
  name: z.string().min(1, 'Имя обязателенo'),
  title: z.string().min(1, 'Название услуги обязателено'),
  description: z.string().min(1, 'Описание обязательно'),
})

const vacancySchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  requirements: z.string().min(1, 'Требования обязательны'),
})

const activeTabTitle = computed(() => (activeTab.value === 'service' ? 'Создание услуги' : 'Создание вакансии'))

async function handleSubmit() {
  error.value = ''
  success.value = ''

  try {
    if (activeTab.value === 'service') {
      const parse = serviceSchema.safeParse(serviceForm.value)
      if (!parse.success) {
        error.value = parse.error.errors.map((item) => item.message).join(', ')
        return
      }

      await postJson('/api/services', parse.data)
      success.value = 'Услуга успешно создана.'
      serviceForm.value = { name: '', title: '', description: '' }
      return
    }

    const parse = vacancySchema.safeParse(vacancyForm.value)
    if (!parse.success) {
      error.value = parse.error.errors.map((item) => item.message).join(', ')
      return
    }

    await postJson('/api/vacancies', parse.data)
    success.value = 'Вакансия успешно создана.'
    vacancyForm.value = { title: '', requirements: '' }
  } catch (err: any) {
    error.value = err.body?.message ?? err.message ?? 'Не удалось сохранить данные'
  }
}

async function logout() {
  try {
    await postJson('/admin/logout', {})
    window.location.href = '/'
  } catch {
    error.value = 'Не удалось выполнить выход'
  }
}
</script>
