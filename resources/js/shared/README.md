# Shared Layer (Общий слой)

Общие компоненты, утилиты, типы и API-клиенты, используемые во всем приложении.

## Структура

```
shared/
├── ui/              # UI компоненты (кнопки, инпуты, модали и т.д.)
├── lib/             # Утилиты и вспомогательные функции
│   ├── types/       # Глобальные типы TypeScript
│   ├── utils.ts     # Утилиты (cn(), формирование CSS классов и т.д.)
│   └── api-client.ts # Клиент для API запросов
└── README.md        # Этот файл
```

## UI Компоненты

В папке `ui/` находятся переиспользуемые UI компоненты (кнопки, инпуты, модали).

**Пример:**
- `Button.vue` — базовая кнопка
- `Input.vue` — инпут
- `Card.vue` — карточка
- `Dialog.vue` — диалоговое окно

Компоненты обычно экспортируются из `index.ts` для удобства:

```typescript
// shared/ui/index.ts
export { default as Button } from './Button.vue'
export { default as Input } from './Input.vue'
```

Использование:
```typescript
import { Button, Input } from '@/shared/ui'
```

## Утилиты

### `utils.ts`

Содержит вспомогательные функции, например функцию `cn()` для объединения CSS классов (из Tailwind):

```typescript
import { cn } from '@/shared/lib/utils'

cn('px-4 py-2', condition && 'bg-blue-500')
// => 'px-4 py-2 bg-blue-500'
```

### `api-client.ts`

Клиент для API запросов с методами: `get()`, `post()`, `put()`, `delete()`:

```typescript
import { apiClient } from '@/shared/lib/api-client'

const users = await apiClient.get('/users')
const newUser = await apiClient.post('/users', { name: 'John' })
```

## Типы

В папке `lib/types/` хранятся глобальные TypeScript типы и интерфейсы:

```typescript
export interface User {
  id: number
  name: string
  email: string
}
```

Используются по всему приложению:

```typescript
import type { User } from '@/shared/lib/types'
```

## Правила

1. **Инкапсуляция** — компоненты и модули в `shared/` должны быть независимыми и не зависеть от других слоёв (features, pages и т.д.).
2. **Переиспользуемость** — код здесь должен быть применим в разных контекстах.
3. **Экспорты** — используйте `index.ts` для экспорта публичного API.
4. **Документация** — документируйте сложные утилиты и типы.
