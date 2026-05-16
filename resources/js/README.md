# FSD Структура проекта

Этот проект использует методологию **Feature-Sliced Design (FSD)** для организации кода.

## 📂 Структура папок

```
resources/js/
├── shared/                    # 🔽 Переиспользуемый код (без зависимостей от других слоев)
│   ├── ui/                    # Базовые UI компоненты
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   ├── Card.vue
│   │   └── index.ts           # Экспорты
│   ├── lib/                   # Утилиты и хелперы
│   │   ├── fetch.ts           # API запросы (postJson, getJson)
│   │   ├── validators.ts      # Валидация
│   │   ├── formatters.ts      # Форматирование данных
│   │   ├── composables.ts     # Переиспользуемые хуки
│   │   └── index.ts
│   └── config/                # Конфигурация
│       ├── api.ts             # API endpoints
│       └── env.ts             # Переменные окружения
│
├── entities/                  # 📦 Модели и типы (User, Product, Service)
│   ├── User/
│   │   ├── model.ts           # Интерфейсы User, LoginPayload
│   │   └── index.ts
│   ├── Product/
│   │   ├── model.ts
│   │   └── index.ts
│   └── Service/
│       ├── model.ts
│       └── index.ts
│
├── features/                  # ✨ Фичи (Auth, Comments, Filters)
│   ├── Auth/
│   │   ├── ui/                # Компоненты фичи
│   │   │   ├── LoginForm.vue
│   │   │   └── RegisterForm.vue
│   │   ├── model.ts           # Типы AuthState, LoginPayload
│   │   ├── composable.ts      # useAuth хук
│   │   └── index.ts           # Экспорты
│   ├── Comments/
│   │   ├── ui/
│   │   ├── model.ts
│   │   ├── composable.ts
│   │   └── index.ts
│   └── Filters/
│       ├── ui/
│       └── index.ts
│
├── widgets/                   # 🎛️ Композитные компоненты
│   ├── Header.vue             # Заголовок с навигацией
│   ├── Sidebar.vue            # Боковая панель
│   ├── Footer.vue             # Подвал
│   └── Navigation.vue
│
├── pages/                     # 📄 Страницы (маршрутизируемые)
│   ├── Home/
│   │   └── index.vue
│   ├── Auth/
│   │   ├── Login/
│   │   │   └── index.vue
│   │   └── Register/
│   │       └── index.vue
│   └── Dashboard/
│       ├── index.vue
│       └── Settings/
│           └── index.vue
│
├── app.ts                     # Точка входа
└── app/
    └── index.vue              # App layout
```

## 🔄 Правила импортов

### Иерархия слоев (стрелка показывает направление зависимостей)

```
pages ↓
  ↓ widgets ↓
    ↓ features ↓
      ↓ entities ↓
        ↓ shared ←
```

### ✅ Правильные импорты:

```typescript
// pages/ может импортировать из всех ниже
import { LoginForm } from '@/features/Auth'
import type { User } from '@/entities/User'
import { Button } from '@/shared/ui'

// features/ импортирует из entities и shared
import type { User } from '@/entities/User'
import { postJson } from '@/shared/lib/fetch'

// entities/ импортирует только из shared
import { validateEmail } from '@/shared/lib/validators'

// shared/ НЕ импортирует ничего
```

### ❌ Неправильные импорты:

```typescript
// Нельзя: shared НЕ импортирует из других слоев
import { useAuth } from '@/features/Auth'  // ❌

// Нельзя: entities НЕ импортирует из features
import { LoginForm } from '@/features/Auth'  // ❌

// Нельзя: features НЕ импортируют друг из друга напрямую
import { CommentList } from '@/features/Comments'  // ❌
```

## 📝 Примеры

### Пример: Создание фичи Auth

**1. Определи типы** (`features/Auth/model.ts`):

```typescript
export interface User {
  id: number
  email: string
  name: string
}

export interface LoginPayload {
  email: string
  password: string
}
```

**2. Создай composable** (`features/Auth/composable.ts`):

```typescript
import { ref } from 'vue'
import { postJson } from '@/shared/lib/fetch'
import { API } from '@/shared/config/api'

export function useAuth() {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const login = async (payload: LoginPayload) => {
    isLoading.value = true
    try {
      user.value = await postJson<User>(API.LOGIN, payload)
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, login }
}
```

**3. Создай компоненты** (`features/Auth/ui/LoginForm.vue`):

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.email" type="email" />
    <input v-model="form.password" type="password" />
    <button :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Sign In' }}</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAuth } from '../composable'

const form = reactive({ email: '', password: '' })
const { isLoading, login } = useAuth()

const handleSubmit = () => login(form)
</script>
```

**4. Экспортируй фичу** (`features/Auth/index.ts`):

```typescript
export { default as LoginForm } from './ui/LoginForm.vue'
export { useAuth } from './composable'
export type { User, LoginPayload } from './model'
```

**5. Используй в странице** (`pages/Auth/Login/index.vue`):

```vue
<template>
  <LoginForm />
</template>

<script setup lang="ts">
import { LoginForm } from '@/features/Auth'
</script>
```

## 🎯 Преимущества FSD

✅ **Масштабируемость** — легко добавлять новые фичи
✅ **Переиспользование** — shared слой доступен везде
✅ **Модульность** — фичи независимы друг от друга
✅ **Чистые зависимости** — нет циклических зависимостей
✅ **Читаемость** — ясная структура кода

## 🚀 Быстрый старт

### Добавить новую UI компоненту

```bash
# Создай файл в shared/ui/
resources/js/shared/ui/Badge.vue

# Экспортируй в index.ts
# shared/ui/index.ts
export { default as Badge } from './Badge.vue'
```

### Добавить новую фичу

```bash
# Создай папку
resources/js/features/MyFeature/
├── ui/
│   └── MyComponent.vue
├── model.ts
├── composable.ts
└── index.ts
```

### Добавить новую страницу

```bash
# Создай папку в pages/
resources/js/pages/MyPage/
└── index.vue

# Используй Inertia для маршрутизации
```

## 📚 Дополнительные ресурсы

- [FSD Документация](https://feature-sliced.design)
- [Vue 3 Best Practices](https://vuejs.org)
- [Inertia.js](https://inertiajs.com)

