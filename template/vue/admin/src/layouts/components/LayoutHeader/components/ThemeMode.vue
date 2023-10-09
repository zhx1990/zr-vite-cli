<template>
  <BaseHoverContainer class="w-40px" :inverted="theme.header.inverted" tooltip-content="主题模式">
    <BaseDarkModeSwitch
      :dark="theme.darkMode"
      :customize-transition="theme.isCustomizeDarkModeTransition"
      class="wh-full"
      @update:dark="theme.setDarkMode"
    />
  </BaseHoverContainer>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store'

defineOptions({ name: 'ThemeMode' })

const theme = useThemeStore()
</script>

<style scoped></style>
