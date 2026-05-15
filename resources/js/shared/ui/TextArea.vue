<template>
  <label class="block text-sm text-gray-700 dark:text-gray-200">
    <span class="block mb-2">{{ label }}</span>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-[#1b1b18] focus:outline-none focus:ring-2 focus:ring-[#1b1b18]/10 dark:border-gray-600 dark:bg-[#111111] dark:text-white"
      :placeholder="placeholder"
      :required="required"
      rows="4"
    />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
})
</script>
