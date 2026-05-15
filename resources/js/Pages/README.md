# Pages (Страницы)

Папка `pages/` содержит компоненты страниц (роуты приложения).

Каждая страница — это отдельная папка с собственными компонентами и логикой, которые используются только на этой странице.

## Примеры структуры страницы

```
pages/
├── HomePage/
│   ├── HomePage.vue
│   ├── components/
│   │   └── HeroSection.vue
│   └── index.ts
├── UsersPage/
│   ├── UsersPage.vue
│   ├── components/
│   │   └── UserTable.vue
│   └── index.ts
└── NotFoundPage/
    ├── NotFoundPage.vue
    └── index.ts
```

## Компоненты страницы

- **PageName.vue** — основной компонент страницы
- **components/** — локальные компоненты, используемые только на этой странице
- **index.ts** — экспорт страницы

## Использование

### Для Inertia + Laravel:

```typescript
// routes/web.php (Laravel)
Route::get('/', function () {
    return inertia('HomePage')
})
```

Компонент:
```typescript
// resources/js/pages/HomePage/HomePage.vue
<template>
  <div class="home-page">
    <HeroSection />
    <BlogPostFeed />
  </div>
</template>

<script setup lang="ts">
import { HeroSection } from './components'
import { BlogPostFeedWidget } from '@/widgets'
</script>
```

## Правила

1. **Локальные компоненты** — компоненты в `components/` используются только на этой странице.
2. **Импорты из других слоёв** — страница может импортировать из `features/`, `entities/`, `widgets/`, `shared/`.
3. **Слой маршрутизации** — страницы обычно управляются роутером (Inertia, Vue Router и т.д.).
4. **Инкапсуляция** — не экспортируйте локальные компоненты страницы для использования на других страницах; вместо этого создавайте widget.

## Примеры компонентов страницы

### HomePage/components/HeroSection.vue

```vue
<template>
  <section class="hero">
    <h1>Welcome to our app</h1>
    <p>This is the hero section of the home page</p>
  </section>
</template>

<script setup lang="ts">
// Логика, специфичная для этой страницы
</script>
```

### UsersPage/components/UserTable.vue

```vue
<template>
  <table>
    <tr v-for="user in users" :key="user.id">
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import type { User } from '@/entities/user'

defineProps<{ users: User[] }>()
</script>
```
