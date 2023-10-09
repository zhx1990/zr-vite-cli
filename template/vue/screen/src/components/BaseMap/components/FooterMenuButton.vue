<template>
  <div class="footer-menu-button flex">
    <span v-html="label"></span>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  label: string
}>()

const label = computed(() => `${props.label.slice(0, 2)}<br />${props.label.slice(2)}`)
</script>
<style lang="scss">
.footer-menu-button {
  justify-content: center;
  width: 93.5px;
  height: 106.5px;
  padding-top: 15px;
  margin-top: -30px;
  font-weight: bold;
  text-align: center;
  background: url('/images/systems/btn_bg1.png') no-repeat;
  background-size: contain;
}

.n-menu-item-content--selected {
  .footer-menu-button {
    background-image: url('/images/systems/btn_bg2.png') !important;
  }
}
</style>
