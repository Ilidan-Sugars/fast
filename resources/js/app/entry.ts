/// <reference types="vite/client" />
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}/index.vue`, import.meta.glob('./Pages/**/*.vue')) as any,
  setup({ el, app, props, plugin }) {
    const vueApp = createApp({ render: () => h(app, props) })
    vueApp.use(plugin)
    vueApp.mount(el)
  },
})
