<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
await navigateTo('/account/favorites', { replace: true })
</script>
