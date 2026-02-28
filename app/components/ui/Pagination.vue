<template>
  <nav v-if="lastPage > 1" class="flex items-center justify-center gap-1 mt-8">
    <button
      @click="go(currentPage - 1)"
      :disabled="currentPage <= 1"
      class="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      Prev
    </button>

    <template v-for="p in pages" :key="p">
      <span v-if="p === '...'" class="px-2 text-gray-400 text-sm">...</span>
      <button
        v-else
        @click="go(p as number)"
        class="px-3 py-1.5 text-sm rounded border transition"
        :class="p === currentPage ? 'bg-[#111111] text-white border-[#111111]' : 'border-gray-200 hover:bg-gray-50'"
      >
        {{ p }}
      </button>
    </template>

    <button
      @click="go(currentPage + 1)"
      :disabled="currentPage >= lastPage"
      class="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{ currentPage: number; lastPage: number }>()
const emit = defineEmits<{ 'update:page': [page: number] }>()

function go(page: number) {
  if (page >= 1 && page <= props.lastPage) emit('update:page', page)
}

const pages = computed(() => {
  const items: (number | string)[] = []
  const c = props.currentPage, l = props.lastPage
  if (l <= 7) {
    for (let i = 1; i <= l; i++) items.push(i)
  } else {
    items.push(1)
    if (c > 3) items.push('...')
    for (let i = Math.max(2, c - 1); i <= Math.min(l - 1, c + 1); i++) items.push(i)
    if (c < l - 2) items.push('...')
    items.push(l)
  }
  return items
})
</script>