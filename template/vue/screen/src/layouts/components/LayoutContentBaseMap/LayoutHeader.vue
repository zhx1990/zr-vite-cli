<template>
  <div class="global-header flex justify-center items-center w-full absolute-lt z-4">
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
  </div>
</template>
<script lang="ts" setup>
import { HeaderWeather, HeaderTime } from './index'

const title = import.meta.env.VITE_APP_TITLE
</script>
<style lang="scss" scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);

  .base-map-header {
    position: relative;
    height: 146px;
    background-image: url('/images/systemsNew/bg_title.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
