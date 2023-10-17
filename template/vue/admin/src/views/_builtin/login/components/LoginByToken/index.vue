<template>
  <div></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store'

const auth = useAuthStore()
const route = useRoute()

onMounted(() => {
  auth.loginStatus()
})
</script>
<style lang="scss" scoped></style>
