# Entities (Сущности предметной области)

Папка `entities/` содержит модели и представления сущностей предметной области (User, Post, Product и т.д.).

Каждая сущность имеет структуру:

```
entities/
├── user/
│   ├── model/
│   │   └── types.ts
│   ├── ui/
│   │   ├── UserCard.vue
│   │   └── UserAvatar.vue
│   ├── api/
│   │   └── userApi.ts
│   └── index.ts
├── post/
│   ├── model/
│   │   └── types.ts
│   ├── ui/
│   │   └── PostCard.vue
│   └── index.ts
└── product/
    ├── model/
    │   └── types.ts
    ├── ui/
    │   └── ProductCard.vue
    └── index.ts
```

## Компоненты entity

- **model/** — типы, интерфейсы и бизнес-логика сущности
- **ui/** — Vue компоненты для отображения сущности (карточки, аватары и т.д.)
- **api/** — API методы для работы с сущностью (CRUD операции)
- **index.ts** — экспорт публичного API

## Примеры

### user/model/types.ts

```typescript
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}
```

### user/ui/UserCard.vue

```vue
<template>
  <div class="user-card">
    <img :src="user.avatar" :alt="user.name" />
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/entities/user/model/types'

defineProps<{ user: User }>()
</script>
```

### user/api/userApi.ts

```typescript
import { apiClient } from '@/shared/lib/api-client'
import type { User } from '@/entities/user/model/types'

export async function fetchUser(id: number): Promise<User> {
  return apiClient.get(`/users/${id}`)
}

export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  return apiClient.put(`/users/${id}`, data)
}
```

### user/index.ts

```typescript
export { default as UserCard } from './ui/UserCard.vue'
export { default as UserAvatar } from './ui/UserAvatar.vue'
export { fetchUser, updateUser } from './api/userApi'
export type { User } from './model/types'
```

## Использование

```typescript
import { UserCard, fetchUser } from '@/entities/user'

const user = await fetchUser(1)
```

## Правила

1. **Модель первична** — сначала определите типы и интерфейсы в `model/`.
2. **UI отделён от логики** — компоненты не должны содержать сложную бизнес-логику.
3. **API отделён** — запросы к backend находятся в `api/`.
4. **Публичное API** — экспортируйте только необходимое из `index.ts`.
