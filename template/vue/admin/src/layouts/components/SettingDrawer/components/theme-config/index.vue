<template>
  <NDivider title-placement="center">主题配置</NDivider>
  <textarea id="themeConfigCopyTarget" v-model="dataClipboardText" class="absolute opacity-0" />
  <NSpace vertical>
    <div ref="copyRef" data-clipboard-target="#themeConfigCopyTarget">
      <NButton type="primary" :block="true">拷贝当前配置</NButton>
    </div>
    <NButton type="warning" :block="true" @click="handleResetConfig"> 重置当前配置 </NButton>
  </NSpace>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import Clipboard from 'clipboard'
import { useThemeStore } from '@/store'

defineOptions({ name: 'ThemeConfig' })

const theme = useThemeStore()

const copyRef = ref<HTMLElement>()

const dataClipboardText = ref(getClipboardText())

function getClipboardText() {
  return JSON.stringify(theme.$state)
}

function handleResetConfig() {
  theme.resetThemeStore()
  window.$message?.success('已重置配置，请重新拷贝！')
}

function clipboardEventListener() {
  if (!copyRef.value) return
  const copy = new Clipboard(copyRef.value)
  copy.on('success', () => {
    window.$dialog?.success({
      title: '操作成功',
      content: '复制成功,请替换 src/settings/theme.json的内容！',
      positiveText: '确定',
    })
  })
}

const stopHandle = watch(
  () => theme.$state,
  () => {
    dataClipboardText.value = getClipboardText()
  },
  { deep: true }
)

onMounted(() => {
  clipboardEventListener()
})
onUnmounted(() => {
  stopHandle()
})
</script>

<style scoped></style>
