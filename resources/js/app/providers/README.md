# App Providers (Провайдеры приложения)

Папка `providers/` содержит глобальные провайдеры для Vue приложения, такие как:
- Роутинг (Vue Router)
- Хранилище состояния (Pinia, Vuex)
- Интернационализация (i18n)
- Темы (Dark mode и т.д.)
- Другие глобальные конфигурации

## Примеры файлов

```
providers/
├── index.ts           # Экспорт всех провайдеров
├── router.ts          # Конфигурация маршрутизации
├── store.ts           # Инициализация хранилища (Pinia/Vuex)
├── i18n.ts            # Конфигурация интернационализации
└── theme.ts           # Управление темой приложения
```

## Использование

В `app/entry.ts` подключаются все провайдеры:

```typescript
import { app } from 'vue'
import { router } from '@/app/providers/router'
import { store } from '@/app/providers/store'

app.use(router)
app.use(store)
```

Добавьте в эту папку необходимые вам провайдеры по мере развития приложения.
