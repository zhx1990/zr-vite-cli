<template>
  <div class="base-map-header flex-1">
    <NGrid cols="3">
      <!-- 天气 -->
      <NGi>
        <HeaderWeather />
      </NGi>
      <NGi class="flex flex-center text-32px pt-10px font-bold tracking-11px oblique">
        {{ title }}
      </NGi>
      <!-- 时间 -->
      <NGi>
        <HeaderTime />
      </NGi>
    </NGrid>
  </div>
</template>
<script lang="ts" setup>
import { HeaderWeather, HeaderTime } from './components'

defineOptions({ name: 'BaseMapHeader' })

const title = import.meta.env.VITE_APP_TITLE
</script>
<style lang="scss" scoped>
.base-map-header {
  position: relative;
  height: 150px;
  background-image: url('/images/systems/bg_title.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
