<template>
  <button
    :type="type"
    :class="buttonClass"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
  class: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

const buttonClass = computed(() =>
  cn(
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.variant === 'secondary'
      ? 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
      : 'bg-[#1b1b18] text-white hover:bg-[#343433]'
    , props.class
  )
)
</script>
