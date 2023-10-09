import { ref } from 'vue'

export function useForm() {
  const formRef = ref()

  const formSubmit = () => formRef.value?.submit()

  const formReset = () => {
    formRef.value?.reset()
  }

  const getFormData = () => formRef.value.getFormData()

  return {
    formRef,
    formSubmit,
    formReset,
    getFormData,
  }
}
