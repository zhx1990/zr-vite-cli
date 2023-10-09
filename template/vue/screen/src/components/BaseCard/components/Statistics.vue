<template>
  <NSpace justify="center">
    <div v-for="(item, index) in props.data" :key="index" class="text-center">
      <BaseNumberAnimation
        class="text-20px font-bold text-[#00faff]"
        :decimals="getDecimals(item)"
        :end-value="item.value"
      />
      <span class="">({{ item.unit }})</span>
      <br />
      {{ item.label }}
    </div>
  </NSpace>
</template>
<script lang="ts" setup>
const props = defineProps<{
  data: Common.OptionWithKey<number>[] & { unit: string }[]
}>()

/**
 * 获取小数点后
 * @param {*} item
 * @return {*}
 */
const getDecimals = (item: any) => item.decimals || 0
</script>
<style lang="scss" scoped></style>
