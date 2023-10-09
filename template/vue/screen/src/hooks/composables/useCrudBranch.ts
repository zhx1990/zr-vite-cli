import {
  type CreateCrudOptionsRet,
  type CrudOptions,
  type DynamicType,
  type FormProps,
  useColumns,
  useFormWrapper,
} from '@fast-crud/fast-crud'
import { ref } from 'vue'

export function useCrudBranch() {
  const formWrapperRef = ref()
  const formWrapperOptions = ref()
  const fsFormRef = ref()
  const { openDialog } = useFormWrapper()

  /**
   * 构建curd表单配置
   * @param {CrudOptions} crudOptions
   * @return {*}
   * @description:
   */
  const buildFormOptions = (crudOptions: DynamicType<CrudOptions> | CrudOptions) => {
    const { buildFormOptions } = useColumns()
    return buildFormOptions(crudOptions)
  }

  /**
   * 加载crudOptions配置转换成buildFormOptions配置
   * @param {function} createCrudOptions
   * @return {*}
   * @description:
   */
  const loadCurdOptionsToBuildFormOptions = (createCrudOptions: () => CreateCrudOptionsRet) => {
    const { crudOptions } = createCrudOptions()
    return buildFormOptions(crudOptions)
  }

  /**
   * 通过formRef打开表单
   * 需配合FsFormWrapper 组件
   * @param {*} options
   * @return {*}
   * @description:
   */
  const openFormWrapper = (buildFormOptions: FormProps) => {
    formWrapperOptions.value = buildFormOptions
    formWrapperRef.value.open(formWrapperOptions.value)
  }

  /**
   * 通过useOpenDialog打开表单
   * @param {*} options
   * @return {*}
   * @description:
   */
  const openFormDialog = async (buildFormOptions: FormProps) => {
    // const opts = buildFormOptions(options)
    // opts.initialForm = { }
    // 新实例打开
    // opts.newInstance = true
    const formRef = await openDialog(buildFormOptions)
    return formRef
  }

  /**
   * 提交表单
   * @return {*}
   * @description:
   */
  const submitForm = () => {
    fsFormRef.value?.submit()
  }

  /**
   * 设置表单数据
   * @param {Common} data
   * @return {*}
   * @description:
   */
  const setFormData = (data: Common.Recordable) => {
    fsFormRef.value.setFormData(data)
  }
  /**
   * 重制表单数据
   * @return {*}
   * @description:
   */
  const resetForm = () => {
    fsFormRef.value.reset()
  }

  return {
    fsFormRef,
    formWrapperRef,
    formWrapperOptions,
    buildFormOptions,
    loadCurdOptionsToBuildFormOptions,
    openFormWrapper,
    openFormDialog,
    submitForm,
    resetForm,
    setFormData,
  }
}
