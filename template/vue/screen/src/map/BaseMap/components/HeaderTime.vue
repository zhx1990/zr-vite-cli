<template>
  <div class="header-time flex">
    <NSpace>
      <div class="time-icon" @click="handlerGoAdmin"></div>
      <div class="time-date">
        <p>{{ date }}</p>
      </div>

      <div class="time-tm">
        <p>{{ time }}</p>
      </div>
    </NSpace>
  </div>
</template>
<script lang="ts" setup>
import { useDateFormat, useNow } from '@vueuse/core'

const date = useDateFormat(useNow(), 'YYYY年MM月DD日')
const time = useDateFormat(useNow(), 'HH:mm:ss')

const handlerGoAdmin = () => {
  window.location.href = 'http://172.16.6.209/admin'
}
</script>
<style lang="scss" scoped>
.header-time {
  position: absolute;
  top: 34px;
  left: 1512px;

  .time-icon {
    width: 25px;
    height: 20px;

    // background: url('/images/systems/bg_data1.png') no-repeat;
    background-image: url('/images/systems/icon_home.png');
    background-repeat: no-repeat;
    background-size: contain;
  }

  .time-date {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    color: #fff;
    text-align: center;
    letter-spacing: 0;
  }

  .time-tm {
    // font-family: Arial-BoldMT;
    font-size: 35px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    color: #fff;
    letter-spacing: 0;
  }
}
</style>
