<template>
  <RouterLink :to="routeHomePath" class="flex-center w-full nowrap-hidden">
    <!-- <BaseSystemLogo class="text-32px text-primary" /> -->
    <h2
      v-show="showTitle"
      class="pl-8px text-16px font-bold text-primary transition duration-300 ease-in-out"
    >
      <!-- {{ t('message.system.title') }} -->
      {{ title }}
    </h2>
  </RouterLink>
</template>

<script setup lang="ts">
import { routePath } from '@/router'
import { t } from '@/locales'

defineOptions({ name: 'LayoutLogo' })

const title = import.meta.env.VITE_APP_NAME

interface Props {
  /** 显示名字 */
  showTitle: boolean
}

defineProps<Props>()

const routeHomePath = routePath('root')
</script>

<style scoped></style>
