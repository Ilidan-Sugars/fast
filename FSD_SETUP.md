# ✅ Проект настроен на FSD (Feature-Sliced Design)

## 📋 Что сделано

✅ **TypeScript** — уже установлен (`^5.9.3`)
✅ **Inertia.js** для Vue3 — уже установлен (`^3.1.1`)
✅ **Vue 3** — уже установлен (`^3.5.34`)
✅ **shadcn-ui** — установлен (`0.9.5`)
✅ **Headless UI** — установлен для компонентов
✅ **FSD структура** — настроена и организована

## 🎯 Структура FSD

Проект теперь следует методологии **Feature-Sliced Design**:

```
resources/js/
├── shared/              # Переиспользуемый код
│   ├── ui/              # UI компоненты (shadcn/ui уже здесь есть)
│   ├── lib/             # Утилиты (fetch, validators, formatters)
│   └── config/          # API endpoints, конфигурация
├── entities/            # Модели (User, Product, Service)
├── features/            # Фичи (Auth, Comments, Filters)
├── widgets/             # Композитные компоненты (Header, Sidebar)
└── pages/               # Страницы Inertia
```

## 📂 Что добавлено

### Примеры файлов:

1. **`PROJECT_RULES.md`** — Подробные правила проекта
2. **`resources/js/README.md`** — Описание FSD структуры
3. **`resources/js/shared/lib/fetch.ts`** — API клиент (postJson, getJson)
4. **`resources/js/shared/lib/validators.ts`** — Функции валидации
5. **`resources/js/shared/lib/formatters.ts`** — Форматирование данных
6. **`resources/js/shared/config/api.ts`** — API endpoints
7. **`resources/js/entities/User/model.ts`** — Типы User
8. **`resources/js/features/Auth/`** — Пример фичи авторизации
   - `composable.ts` — useAuth хук
   - `model.ts` — TypeScript типы
   - `ui/LoginForm.vue` — Компонент формы

## 🚀 Как начать разработку

### 1. Используй alias `@` для импортов

```typescript
// ✅ Правильно
import { Button } from '@/shared/ui'
import { useAuth } from '@/features/Auth'
import type { User } from '@/entities/User'
import { postJson } from '@/shared/lib/fetch'

// ❌ Неправильно
import { Button } from '../../../../shared/ui'
```

### 2. Создавай компоненты в правильных местах

- **Базовые компоненты** (Button, Input, Card) → `shared/ui/`
- **Утилиты и хуки** → `shared/lib/`
- **Типы и модели** → `entities/` или `features/*/model.ts`
- **Фичи** (Auth, Comments) → `features/*/`
- **Вся логика фичи** → `features/FeatureName/`
- **Страницы** → `pages/`

### 3. Следуй иерархии импортов

```
pages/ → widgets/ → features/ → entities/ → shared/
```

**Запомни:** Нижние слои НЕ должны импортировать из верхних!

### 4. Структура фичи

Каждая фича должна иметь:

```
features/Auth/
├── ui/                    # Компоненты
│   ├── LoginForm.vue
│   └── RegisterForm.vue
├── model.ts               # Типы
├── composable.ts          # Логика (useAuth)
└── index.ts               # Экспорты
```

## 💡 Примеры

### Добавить новый UI компонент

```bash
# Создай файл
resources/js/shared/ui/MyComponent.vue

# Обнови экспорты
# resources/js/shared/ui/index.ts
export { default as MyComponent } from './MyComponent.vue'
```

### Добавить новую фичу

```bash
# Создай структуру
resources/js/features/MyFeature/
├── ui/
│   └── MyComponent.vue
├── model.ts
├── composable.ts
└── index.ts

# Используй в странице
import { MyComponent, useMyFeature } from '@/features/MyFeature'
```

### API запрос

```typescript
// ✅ Правильно: используй shared/lib/fetch
import { postJson } from '@/shared/lib/fetch'
import { API } from '@/shared/config/api'

const response = await postJson(API.LOGIN, { email, password })

// ❌ Неправильно: не делай fetch напрямую в компоненте
const response = await fetch('/api/login', { method: 'POST' })
```

## 🔍 Проверка типов

```bash
npm run types:check     # Проверить TypeScript
npm run lint            # ESLint
npm run format          # Prettier
```

## 📚 Дополнительно

- Полные правила проекта: **`PROJECT_RULES.md`**
- Подробно про структуру: **`resources/js/README.md`**
- [FSD Документация](https://feature-sliced.design)
- [Vue 3 Documentation](https://vuejs.org)
- [Inertia.js Documentation](https://inertiajs.com)

## ⚠️ Важные правила

1. **Запретные импорты:**
   - ❌ shared НЕ может импортировать из features, entities, pages
   - ❌ entities НЕ может импортировать из features, pages
   - ❌ features НЕ может импортировать друг из друга напрямую

2. **Правило одного входа:**
   - Каждый слой должен иметь `index.ts` с экспортами
   - Импортируй через `index.ts`, а не напрямую из файлов

3. **TypeScript везде:**
   - Используй типы для всех параметров функций
   - Экспортируй типы из `model.ts`
   - Аннотируй props и emits в компонентах

4. **Tailwind + shadcn/ui:**
   - shadcn/ui компоненты уже в `resources/js/components/ui/`
   - Можно использовать прямо или переместить в `shared/ui/`
   - Используй Tailwind классы для стилизации

---

Проект готов к разработке! 🎉

