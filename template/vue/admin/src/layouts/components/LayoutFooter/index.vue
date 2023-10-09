<template>
  <BaseDarkModeContainer class="flex-center h-full" :inverted="theme.footer.inverted">
    <span>Copyright ©2021 Admin</span>
  </BaseDarkModeContainer>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'

defineOptions({ name: 'LayoutFooter' })

const theme = useThemeStore()
</script>

<style scoped></style>
