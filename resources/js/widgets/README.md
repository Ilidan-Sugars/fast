# Widgets (Составные UI блоки)

Папка `widgets/` содержит составные UI блоки, которые объединяют компоненты из `features/` и `entities/` для отображения сложных участков интерфейса.

Виджеты — это переиспользуемые составные части, которые могут находиться на разных страницах.

## Примеры структуры widget

```
widgets/
├── UserListWidget/
│   ├── UserListWidget.vue
│   ├── composables/
│   │   └── useUserList.ts
│   └── index.ts
├── BlogPostFeedWidget/
│   ├── BlogPostFeedWidget.vue
│   ├── composables/
│   │   └── useBlogFeed.ts
│   └── index.ts
└── HeaderWidget/
    ├── HeaderWidget.vue
    ├── composables/
    │   └── useHeader.ts
    └── index.ts
```

## Отличие от features и entities

- **Entities** — модели предметной области и их UI представления (User, Post, Product).
- **Features** — бизнес-функции (Auth, Search, Filter).
- **Widgets** — составные блоки для конкретного макета (UserListWidget, BlogPostFeed).

Виджет может использовать компоненты и логику из features и entities:

```vue
<template>
  <div class="user-list-widget">
    <SearchBar @search="handleSearch" />
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script setup lang="ts">
import { SearchBar } from '@/features/search'
import { UserCard } from '@/entities/user'
import { useUserList } from './composables/useUserList'

const { users, handleSearch } = useUserList()
</script>
```

## Структура widget

- **ComponentName.vue** — основной компонент виджета
- **composables/** — логика состояния и взаимодействия
- **index.ts** — экспорт публичного API

## Использование

```typescript
import { UserListWidget } from '@/widgets'
```

## Правила

1. **Переиспользуемость** — виджет может находиться на разных страницах.
2. **Переносимость** — виджет не должен быть жёстко связан со страницей.
3. **Композиция** — виджеты составляются из features и entities.
4. **Пропсы и события** — коммуникация через пропсы и emit события.
