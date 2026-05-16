# Правила проекта

## 📐 Архитектура: Feature-Sliced Design (FSD)

Проект организован по методологии FSD, которая обеспечивает масштабируемость и легкость поддержки кода.

### Структура слоев

```
resources/js/
├── shared/          # 🔽 Переиспользуемый код
│   ├── ui/          # UI компоненты (Button, Input, Modal и т.д.)
│   ├── lib/         # Утилиты и хелперы (fetch, validation, formatters)
│   └── config/      # Глобальная конфигурация
├── entities/        # 📦 Модели и логика (User, Product, Service)
├── features/        # ✨ Фичи приложения (Auth, Filters, Comments)
├── widgets/         # 🎛️ Композитные компоненты (Header, Sidebar, Footer)
├── pages/           # 📄 Страницы приложения (Home, Dashboard, Settings)
├── app.ts           # Точка входа
└── app/             # App layout
```

---

## 🎯 Описание слоев

### **shared/** — Общее
Переиспользуемый код, который не зависит от остальной части приложения.

- **ui/** — Базовые UI компоненты
  ```
  shared/ui/
  ├── Button.vue          # Базовый компонент кнопки
  ├── Input.vue           # Input поле
  ├── Modal.vue           # Модальное окно
  ├── Card.vue
  └── index.ts            # Экспорты
  ```

- **lib/** — Утилиты, хелперы, хуки
  ```
  shared/lib/
  ├── fetch.ts            # API запросы (postJson, getJson и т.д.)
  ├── validators.ts       # Валидация данных
  ├── formatters.ts       # Форматирование (дата, число, строка)
  ├── useComposable.ts    # Vue composables
  └── constants.ts        # Константы приложения
  ```

- **config/** — Конфигурация
  ```
  shared/config/
  ├── api.ts              # API endpoints
  └── env.ts              # Переменные окружения
  ```

### **entities/** — Модели
Домены приложения с их бизнес-логикой, но без UI.

```
entities/
├── User/
│   ├── model.ts         # Интерфейсы и типы User
│   ├── composable.ts    # useUser composable
│   └── index.ts
├── Product/
│   ├── model.ts
│   └── index.ts
└── Service/
    ├── model.ts
    └── index.ts
```

### **features/** — Фичи
Отдельные фичи приложения, которые можно включать/отключать независимо.

```
features/
├── Auth/
│   ├── ui/              # Компоненты авторизации
│   │   ├── LoginForm.vue
│   │   └── RegisterForm.vue
│   ├── model.ts         # Типы и интерфейсы
│   ├── composable.ts    # useAuth composable
│   └── index.ts
├── Comments/
│   ├── ui/
│   │   ├── CommentList.vue
│   │   └── CommentForm.vue
│   ├── model.ts
│   └── index.ts
└── Filters/
    ├── ui/
    └── index.ts
```

### **widgets/** — Композитные компоненты
Крупные компоненты, скомпонованные из других слоев.

```
widgets/
├── Header.vue           # Заголовок с навигацией
├── Sidebar.vue          # Боковая панель
├── Footer.vue           # Подвал
└── Navigation.vue
```

### **pages/** — Страницы
Страницы приложения, маршрутизируемые через Inertia.

```
pages/
├── Home/
│   └── index.vue
├── Auth/
│   ├── Login/
│   │   └── index.vue
│   └── Register/
│       └── index.vue
├── Dashboard/
│   ├── index.vue
│   └── Settings/
│       └── index.vue
└── NotFound/
    └── index.vue
```

---

## ✅ Правила разработки

### 1️⃣ Зависимости между слоями

```
pages/ → widgets/ → features/ → entities/ → shared/
               ↘___________↙

✅ МОЖНО:
- pages импортируют из widgets, features, entities, shared
- features импортируют из entities, shared
- widgets импортируют из features, entities, shared
- entities импортируют только из shared
- shared НЕ импортирует ничего из остальных слоев

❌ НЕЛЬЗЯ:
- shared ← импортирует что-то кроме shared
- entities ← импортируют из features, widgets, pages
- features ← импортируют из widgets, pages
```

### 2️⃣ Именование файлов

```typescript
// ✅ Правильно
Button.vue                    // PascalCase для компонентов
useUser.ts                    // use* для composables
validators.ts                 // camelCase для утилит
user.model.ts                 // entity.model.ts
auth.composable.ts            // feature.composable.ts

// ❌ Неправильно
button.vue
useUserComposable.ts
Validators.ts
user_model.ts
```

### 3️⃣ Структура компонента

```vue
<template>
  <div class="component">
    <!-- HTML -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Props } from './types'

// Props
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// State
const isLoading = ref(false)

// Computed
const classes = computed(() => ({
  'is-loading': isLoading.value,
}))

// Methods
const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.component {
  @apply flex items-center gap-2;
}
</style>
```

### 4️⃣ Структура feature

```typescript
// features/Auth/index.ts
export { default as LoginForm } from './ui/LoginForm.vue'
export { default as RegisterForm } from './ui/RegisterForm.vue'
export { useAuth } from './composable'
export type { User, LoginPayload } from './model'

// features/Auth/composable.ts
import { ref } from 'vue'
import type { User, LoginPayload } from './model'

export function useAuth() {
  const user = ref<User | null>(null)
  
  const login = async (payload: LoginPayload) => {
    // Логика
  }
  
  return { user, login }
}
```

### 5️⃣ API запросы

Все API запросы только через `shared/lib/fetch.ts`:

```typescript
// shared/lib/fetch.ts
export async function postJson<T>(url: string, data: Record<string, any>) {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token || '',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) throw new Error('API error')
  return response.json() as Promise<T>
}

// features/Auth/composable.ts
import { postJson } from '@/shared/lib/fetch'

export function useAuth() {
  const login = (payload: LoginPayload) => {
    return postJson<User>('/api/admin/login', payload)
  }
}
```

### 6️⃣ Импорты

Используй alias `@`:

```typescript
// ✅ Правильно
import { Button } from '@/shared/ui'
import { useAuth } from '@/features/Auth'
import type { User } from '@/entities/User'

// ❌ Неправильно
import { Button } from '../../../../shared/ui'
import { useAuth } from '../../../features/Auth'
```

### 7️⃣ TypeScript типы

Размещай типы рядом с компонентами:

```typescript
// features/Auth/ui/LoginForm.vue
<script setup lang="ts">
interface FormData {
  email: string
  password: string
}

const form = ref<FormData>({
  email: '',
  password: '',
})
</script>

// Или в отдельном файле
// features/Auth/model.ts
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

### 8️⃣ Tailwind CSS классы

Используй `@apply` для переиспользуемых стилей:

```vue
<style scoped>
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition;
}

.card {
  @apply bg-white rounded-lg shadow-md p-6;
}
</style>
```

---

## 📂 Миграция текущей структуры

### Текущее состояние
```
resources/js/
├── actions/           → features/
├── components/        → shared/ui/ или widgets/
├── composables/       → shared/lib/ или entities/
├── layouts/           → app/
├── lib/               → shared/lib/
├── pages/             → pages/
├── routes/            → shared/config/
└── types/             → entities/
```

### План миграции
1. `components/` → `shared/ui/` (базовые) и `widgets/` (сложные)
2. `composables/` → `shared/lib/` (утилиты) и `entities/` (модели)
3. `actions/` → `features/*/model.ts` или `features/*/composable.ts`
4. `routes/` → `shared/config/`
5. `types/` → `entities/`

---

## 🔧 Примеры

### Пример: Фича авторизации

```
features/Auth/
├── ui/
│   ├── LoginForm.vue
│   └── RegisterForm.vue
├── model.ts           # export interface User, LoginPayload
├── composable.ts      # export function useAuth()
└── index.ts           # export * from './ui'; export * from './model'
```

**model.ts:**
```typescript
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
```

**composable.ts:**
```typescript
import { ref } from 'vue'
import { postJson } from '@/shared/lib/fetch'
import type { User, LoginPayload } from './model'

export function useAuth() {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (payload: LoginPayload) => {
    isLoading.value = true
    try {
      user.value = await postJson<User>('/api/admin/login', payload)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, error, login }
}
```

**ui/LoginForm.vue:**
```vue
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <Input v-model="form.email" type="email" placeholder="Email" />
    <Input v-model="form.password" type="password" placeholder="Password" />
    <Button type="submit" :loading="isLoading">Sign In</Button>
    <span v-if="error" class="text-red-600">{{ error }}</span>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composable'
import { Input } from '@/shared/ui'
import Button from '@/shared/ui/Button.vue'

const form = ref({ email: '', password: '' })
const { isLoading, error, login } = useAuth()

const handleSubmit = async () => {
  await login(form.value)
}
</script>
```

---

## 📋 Чек-лист при добавлении нового модуля

- [ ] Определить, какой слой: shared, entities, features, widgets, pages
- [ ] Создать папку с правильной структурой
- [ ] Добавить `index.ts` с экспортами
- [ ] Написать типы (если нужны)
- [ ] Следовать правилам импортов (стрелка вниз по слоям)
- [ ] Использовать `@/` alias для импортов
- [ ] Добавить комментарии для сложной логики
- [ ] Протестировать на циклических зависимостях

---

## 🚀 Запуск разработки

```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run types:check  # Проверка типов
npm run lint     # ESLint
npm run format   # Prettier
```

---

## 📚 Дополнительные ресурсы

- [FSD Methodology](https://feature-sliced.design)
- [Vue 3 Best Practices](https://vuejs.org)
- [Inertia.js Documentation](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## 🧭 Итоговая структура проекта

Проект использует Laravel + Inertia + Vue для frontend и Laravel Fortify для аутентификации. Ниже — основные папки и файлы, которые сейчас используются.

```
app/
├── Actions/ Fortify/               # Создание пользователей и регистрация
├── Http/ Controllers/              # Контроллеры и логика маршрутов
│   └── AdminController.php         # Админ-панель и управление ролями
├── Models/ User.php                # Модель пользователя с полем role
bootstrap/
config/ fortify.php                # Настройки Fortify, маршруты auth
database/
├── factories/ UserFactory.php      # Фабрика пользователей
├── migrations/                     # Миграции БД
│   ├── 0001_01_01_000000_create_users_table.php
│   └── 2026_05_16_000000_add_role_to_users_table.php
└── seeders/ DatabaseSeeder.php     # Создание admin@example.com администратора
public/
resources/
├── js/
│   ├── app.ts                      # Точка входа Inertia
│   ├── layouts/                    # Глобальные макеты App / Auth
│   ├── pages/                      # Inertia страницы
│   │   ├── Welcome.vue             # Главная страница
│   │   ├── Dashboard.vue           # Пользовательская панель
  │   └── Admin.vue               # Админ-панель
│   ├── components/                 # UI-компоненты, сайдбар
│   ├── types/ auth.ts              # Типы текущего пользователя
│   └── routes/ index.ts            # generated route helpers
└── views/ app.blade.php            # Inertia root шаблон
routes/
├── web.php                        # Основные маршруты приложения
├── settings.php                   # маршруты настроек
tests/                             # Автоматизированные тесты
PROJECT_RULES.md                   # Правила и структура проекта
```

### Ключевые правила, применённые к задаче
- Админка доступна только после входа и проверки роли `admin`.
- Главная страница доступна всем пользователям.
- Регистрация создаёт обычного пользователя `user`, администратор создаётся сидером.
- Управление ролями реализовано через отдельный контроллер `AdminController`.

