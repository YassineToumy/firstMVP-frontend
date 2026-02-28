<template>
  <div class="relative" ref="wrapper">
    <button
      @click="open = !open"
      class="flex items-center gap-2 text-sm px-3 py-1.5 rounded border border-gray-600 hover:border-gray-400 transition"
    >
      <span>{{ region.current.name }}</span>
      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="open" class="absolute top-full left-0 mt-1 w-44 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
        <button
          v-for="r in regions"
          :key="r.code"
          @click="select(r.code)"
          class="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-800 transition flex items-center justify-between"
          :class="r.code === region.currentCode ? 'text-white bg-gray-800' : 'text-gray-300'"
        >
          <span>{{ r.name }}</span>
          <span class="text-xs text-gray-500">{{ r.currency }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { REGIONS } from '~/stores/region'

const region = useRegionStore()
const regions = REGIONS
const open = ref(false)
const wrapper = ref<HTMLElement>()

function select(code: string) {
  region.setRegion(code)
  open.value = false
}

onMounted(() => {
  document.addEventListener('click', (e: MouseEvent) => {
    if (wrapper.value && !wrapper.value.contains(e.target as Node)) {
      open.value = false
    }
  })
})
</script>