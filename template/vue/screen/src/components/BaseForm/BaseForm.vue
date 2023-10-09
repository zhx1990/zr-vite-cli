<template>
  <div class="base-form w-[100%]">
    <FsForm ref="formRef" v-bind="formOptions" />
    <NSpace justify="end">
      <NButton @click="formReset">重置</NButton>
      <NButton type="primary" @click="handlerSubmit">处理</NButton>
    </NSpace>
  </div>
</template>
<script lang="ts" setup>
import { useCrudBranch, useForm } from '@/hooks'
import { dict } from '@fast-crud/fast-crud'
import {
  type CreateCrudOptionsRet,
  type CrudOptions,
  type DynamicType,
  type FormProps,
} from '@fast-crud/fast-crud'

defineOptions({ name: 'BaseForm' })

const props = defineProps<{
  options: DynamicType<CrudOptions> | CrudOptions
}>()

const { buildFormOptions } = useCrudBranch()

const { formRef, formSubmit, getFormData, formReset } = useForm()
const formOptions = buildFormOptions(props.options)

const handlerSubmit = async () => {
  const res = await formSubmit()
  if (res) {
    props.options.doSubmit()
  }
}
</script>
<style lang="scss" scoped></style>
