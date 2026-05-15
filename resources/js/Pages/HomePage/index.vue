<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#080808] flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-lg dark:border-gray-800 dark:bg-[#111111]">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-semibold text-[#1b1b18] dark:text-white">Добро пожаловать</h1>
        <p class="mt-4 text-gray-600 dark:text-gray-300">Публичная главная страница проекта. Отсюда вы можете перейти в административную панель.</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-[#151515]">
          <h2 class="text-xl font-semibold text-[#1b1b18] dark:text-white">Админ-панель</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-300">Войдите в администрацию, чтобы создать услуги и вакансии.</p>
          <Link href="/admin/login" class="mt-6 inline-flex rounded-md bg-[#1b1b18] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#343433]">Перейти в админку</Link>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#0f0f0f]">
          <h2 class="text-xl font-semibold text-[#1b1b18] dark:text-white">Схема работы</h2>
          <ul class="mt-3 space-y-3 text-gray-600 dark:text-gray-300">
            <li>• Главная страница с публичным приветствием.</li>
            <li>• Страница входа администратора на `/admin/login`.</li>
            <li>• Панель создания услуг и вакансий на `/admin`.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/inertia-vue3'
</script>
