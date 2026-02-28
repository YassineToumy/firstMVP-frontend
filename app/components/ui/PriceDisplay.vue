<template>
  <span :class="classes">{{ formatted }}</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  amount: number
  currency: string
  period?: string
  size?: 'sm' | 'base' | 'lg' | 'xl'
}>(), { period: '/month', size: 'base' })

const classes = computed(() => ({
  'font-bold text-[#111111]': true,
  'text-sm': props.size === 'sm',
  'text-base': props.size === 'base',
  'text-lg': props.size === 'lg',
  'text-2xl': props.size === 'xl',
}))

const formatted = computed(() => {
  const locales: Record<string, string> = { EUR: 'fr-FR', TND: 'fr-TN', EGP: 'en-EG', CAD: 'en-CA' }
  try {
    const f = new Intl.NumberFormat(locales[props.currency] || 'en-US', {
      style: 'currency', currency: props.currency, maximumFractionDigits: 0,
    }).format(props.amount)
    return props.period ? `${f} ${props.period}` : f
  } catch {
    return `${props.amount.toLocaleString()} ${props.currency}`
  }
})
</script>