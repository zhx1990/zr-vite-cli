<template>
  <div class="flex-col-center gap-24px min-h-520px wh-full overflow-hidden">
    <div class="flex text-400px text-primary">
      <icon-local-no-permission v-if="type === '403'" />
      <icon-local-not-found v-if="type === '404'" />
      <icon-local-service-error v-if="type === '500'" />
    </div>
    <RouterLink :to="{ name: routeHomePath }">
      <NButton type="primary">回到首页</NButton>
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { routeName } from '@/router'

defineOptions({ name: 'BaseErrorPage' })

type ExceptionType = '403' | '404' | '500'

interface Props {
  /** 异常类型 403 404 500 */
  type: ExceptionType
}

defineProps<Props>()

const routeHomePath = routeName('root')
</script>

<style scoped></style>
