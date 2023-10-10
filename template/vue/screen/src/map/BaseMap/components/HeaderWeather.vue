<template>
  <div class="header-weather flex">
    <NSpace>
      <div class="weather-bg"></div>
      <div class="weather-main"><p>福州，雷阵雨</p></div>
      <div class="weather-tem">
        <p>37<span style="font-size: 11px">℃</span></p>
        <p style="font-size: 14px">35/25</p>
      </div>
    </NSpace>
    <NSpace>
      <div v-for="(item, index) in list" :key="index" class="weather-tmRate">
        <div class="weather-tm">
          <p>{{ item.tm }}</p>
        </div>
        <div class="weather-bg1"></div>
        <div class="weather-rate">
          <p>{{ item.rate }}</p>
        </div>
      </div>
      <div class="weather-tmRate">
        <div class="weather-more">
          <p>更多>></p>
        </div>
      </div>
    </NSpace>
  </div>
</template>
<script lang="ts" setup>
const list = [
  {
    key: 1,
    tm: '16:00',
    rate: '80%',
  },
  {
    tm: '17:00',
    rate: '70%',
  },
  { tm: '18:00', rate: '60%' },
]
</script>
<style lang="scss" scoped>
.header-weather {
  position: absolute;
  top: 34px;
  left: 40px;

  .weather-bg {
    width: 33px;
    height: 35px;

    // background: url('/images/systems/bg_data1.png') no-repeat;
    background-image: url('/images/systems/weather.png');
    background-repeat: no-repeat;
    background-size: contain;
  }

  .weather-main {
    width: 150px;
    height: 25px;

    // font-family: MicrosoftYaHei-Bold;
    font-size: 25px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    color: #fff;
    letter-spacing: 0;
  }

  .weather-tem {
    width: 45px;
    height: 39px;
    margin-right: 41px;

    // font-family: MicrosoftYaHei-Bold;
    font-size: 25px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 17px;
    color: #fff;
    letter-spacing: 0;
  }

  .weather-tmRate {
    display: flex;
    flex-wrap: wrap;
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中 */
    width: 38px;
    height: 39px;

    .weather-bg1 {
      width: 18px;
      height: 18px;

      // background: url('/images/systems/bg_data1.png') no-repeat;
      background-image: url('/images/systems/weather.png');
      background-repeat: no-repeat;
      background-size: contain;
    }

    .weather-tm {
      // font-family: Arial-BoldMT;
      margin-bottom: 1px;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 12px;
      color: #fff;
      letter-spacing: 0;
    }

    .weather-rate {
      // font-family: ArialMT;
      margin-top: 1px;
      font-size: 11px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 12px;
      color: #fff;
      text-align: center;
      letter-spacing: 0;
    }
  }

  .weather-more {
    // font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 12px;
    color: #008cff;
    letter-spacing: 0;
    opacity: 0.6;
  }
}
</style>
