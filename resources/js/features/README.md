# Features (Бизнес-функции)

Папка `features/` содержит бизнес-функции и логику взаимодействия пользователя.

Каждая фича — это отдельная папка с собственными компонентами, хуками, сервисами и т.д.

## Примеры структуры feature

```
features/
├── auth/
│   ├── ui/
│   │   ├── LoginForm.vue
│   │   └── RegisterForm.vue
│   ├── composables/
│   │   └── useAuth.ts
│   ├── api/
│   │   └── authApi.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts          # Экспорт публичного API
├── profile/
│   ├── ui/
│   │   └── ProfileCard.vue
│   ├── composables/
│   │   └── useProfile.ts
│   └── index.ts
└── search/
    ├── ui/
    │   ├── SearchBar.vue
    │   └── SearchResults.vue
    └── index.ts
```

## Инкапсуляция

Каждая feature инкапсулирует свою логику. Используйте `index.ts` для экспорта публичного API:

```typescript
// features/auth/index.ts
export { default as LoginForm } from './ui/LoginForm.vue'
export { default as RegisterForm } from './ui/RegisterForm.vue'
export { useAuth } from './composables/useAuth'
```

Использование:
```typescript
import { LoginForm, useAuth } from '@/features/auth'
```

## Уровни внутри feature

- **ui/** — Vue компоненты, специфичные для этой feature
- **composables/** — Vue composables и логика состояния
- **api/** — API запросы (обычно используют `@/shared/lib/api-client`)
- **types/** — типы и интерфейсы, специфичные для feature
- **index.ts** — публичное API, то что экспортируется наружу

## Правила

1. **Инкапсуляция** — не импортируйте внутренние файлы feature напрямую, используйте публичное API из `index.ts`.
2. **Независимость** — feature не должны зависеть друг от друга; если нужна общая логика, перемещайте её в `shared/`.
3. **Минимальный API** — экспортируйте только необходимое из `index.ts`.
