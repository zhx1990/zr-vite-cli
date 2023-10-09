<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="userName">
      <n-input v-model:value="model.userName" placeholder="请输入用户名" />
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
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button :text="true" @click="toLoginModule('reset-pwd')">忘记密码？</n-button>
      </div>
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
    <other-account @login="handleLoginOtherAccount" />
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useAuthStore } from '@/store'
import { useRouterPush } from '@/hooks'
import { formRules, getImgCodeRule } from '@/utils'
import { OtherAccount } from './components'

const auth = useAuthStore()
const { login } = useAuthStore()
const { toLoginModule } = useRouterPush()

const formRef = ref<HTMLElement & FormInst>()

const model = reactive({
  userName: 'ZhengHaoXian',
  password: 'zhenghaoxian123',
  imgCode: '',
})

const imgCode = ref('')

const rules: FormRules = {
  password: formRules.pwd,
  // imgCode: getImgCodeRule(imgCode),
}
const rememberMe = ref(false)

async function handleSubmit() {
  await formRef.value?.validate()

  const { userName, password } = model

  login(userName, password)
}

function handleLoginOtherAccount(param: { userName: string; password: string }) {
  const { userName, password } = param
  login(userName, password)
}
</script>

<style scoped></style>
