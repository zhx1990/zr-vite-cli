<template>
  <div class="absolute right-0px top-100px bg-black">
    <NSelect
      v-model:value="value"
      :options="options"
      filterable
      placeholder="请搜索测站"
      @update-value="handlerUpdate"
    ></NSelect>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { usePosition } from '@/hooks/useCesium'

const value = ref()

const options = ref<any>([
  { label: '测站01', value: '119.4426, 26.6125' },
  { label: '测站02', value: '119.291514, 26.556467' },
  { label: '测站03', value: '119.426944, 26.604722' },
  { label: '测站04', value: '119.7525, 26.5481' },
  { label: '测站05', value: '119.3466, 26.568' },
  { label: '测站06', value: '119.549101, 26.493789' },
  { label: '测站07', value: '119.4721, 26.5276' },
  { label: '测站08', value: '119.6239, 26.4532' },
  { label: '测站09', value: '119.5007, 26.4779' },
  { label: '测站10', value: '119.5401, 26.484' },
  { label: '测站11', value: '119.5434, 26.503' },
  { label: '测站12', value: '119.5475, 26.5168' },
  { label: '测站13', value: '119.4271, 26.5491' },
  { label: '测站14', value: '119.2777, 26.4463' },
  { label: '测站15', value: '119.4917, 26.572' },
])

const { flyToPosition } = usePosition()
const handlerUpdate = (value) => {
  const [lng, lat] = value.split(',')
  const pos = new DC.Position(lng, lat, 5000)
  flyToPosition(pos)
  console.log('value :>> ', lng, lat)
}
</script>

<style lang="scss" scoped></style>
