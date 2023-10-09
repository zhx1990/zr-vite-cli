<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="userName">
      <n-input v-model:value="model.identity" placeholder="请输入用户名" />
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        placeholder="请输入密码"
      />
    </n-form-item>
    <n-form-item path="imgCode">
      <n-input v-model:value="model.imgCode" placeholder="验证码,点击图片刷新" />
      <div class="pl-8px">
        <base-image-verify v-model:code="imgCode" />
      </div>
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="auth.loginLoading"
        @click="handleSubmit"
      >
        确定
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useAuthStore } from '@/store'
import { formRules, getImgCodeRule } from '@/utils'

const auth = useAuthStore()
const { login } = useAuthStore()

const formRef = ref<HTMLElement & FormInst>()

const model = reactive<ApiSite.PwdLoginParams & { imgCode: string }>({
  identity: 'admin',
  password: 'Zr@123456.',
  device: 'PC',
  imgCode: '',
})

const imgCode = ref('')

const rules: FormRules = {
  password: formRules.pwd,
  imgCode: getImgCodeRule(imgCode),
}

async function handleSubmit() {
  await formRef.value?.validate()
  login(model)
}
</script>

<style scoped></style>
