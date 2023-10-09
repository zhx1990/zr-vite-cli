import type { App } from 'vue'
import { merge } from 'lodash'
import type { FsSetupOptions, PageQuery } from '@fast-crud/fast-crud'
import {
  FastCrud,
  ColumnCompositionProps,
  CrudOptions,
  useColumns,
  UseCrudProps,
  useUi,
  setLogger,
} from '@fast-crud/fast-crud'
import '@fast-crud/fast-crud/dist/style.css'
import './common.scss'

import type { FsUploaderOptions } from '@fast-crud/fast-extends'
import {
  FsExtendsCopyable,
  FsExtendsEditor,
  FsExtendsJson,
  FsExtendsTime,
  FsExtendsUploader,
} from '@fast-crud/fast-extends'

import '@fast-crud/fast-extends/dist/style.css'
import UiNaive from '@fast-crud/ui-naive'
import axios from 'axios'
import type { VueI18n } from 'vue-i18n'
import { mockRequest, request } from '@/service/request'
import { Source } from '@/service/api/adminFile'
import { getServiceEnvConfig } from '~/.env-config'
// import { setupNaive } from '@/plugins/fast-crud/naive'

/**
 *  fast-crud的安装方法
 *  注意：在App.vue中，需要用fs-ui-context组件包裹RouterView，让fs-crud拥有message、notification、dialog的能力
 * @param app
 * @param options
 */
export type FsSetupOpts = {
  i18n?: VueI18n
}

function install(app: App, options: FsSetupOpts = {}) {
  // 安装naive ui 常用组件
  // setupNaive(app)
  app.use(UiNaive)
  // debug、 info 、warn、 error
  setLogger({ level: 'warn' })

  app.use(FastCrud, {
    logger: { off: { tableColumns: false } },
    i18n: options.i18n,
    async dictRequest(context: { url: string }) {
      const { url } = context
      let res: Service.SuccessResult | Service.FailedResult
      if (url && url.startsWith('/mock')) {
        // 如果是crud开头的dict请求视为mock
        res = await mockRequest.get(url.replace('/mock', ''))
      } else {
        res = await request.get(url)
      }
      res = res || {}
      return res.data || []
    },
    /**
     * useCrud时会被执行
     */
    commonOptions() {
      return {
        toolbar: {
          buttons: {
            compact: {
              show: false,
            },
            columns: {
              show: false,
            },
            export: {
              show: false,
            },
          },
        },
        table: {
          size: 'small',
          pagination: false,
        },
        search: {
          autoSearch: false,
          options: {
            size: 'medium',
          },
        },
        rowHandle: {
          align: 'center',
          buttons: {
            view: { text: '查看', size: 'small', ghost: true },
            edit: { text: '编辑', size: 'small', ghost: true },
            remove: { type: 'error', text: '删除', size: 'small', ghost: true },
          },
          dropdown: {
            more: { size: 'small' },
          },
        },
        request: {
          // 查询参数转换
          transformQuery: ({ page, form, sort }: PageQuery) => {
            const pageSize = page?.pageSize || 10
            const current = page?.currentPage ?? 1
            return {
              pageSize,
              current,
              sort: sort || {},
              ...form,
            }
          },
          // page请求结果转换
          transformRes: ({ res }) => {
            let transformRes = {} as any
            const { size, current } = res
            const currentPage = current
            const pageSize = size
            const { total } = res
            if (Array.isArray(res)) {
              transformRes.currentPage = 1
              transformRes.total = 1
              transformRes.pageSize = 1
              transformRes.records = [...res]
            } else {
              transformRes = {
                records: res.records,
                currentPage,
                pageSize,
                total,
              }
            }

            return { ...transformRes }
          },
        },
        form: {
          display: 'flex', // 表单布局
          labelWidth: '120px', // 表单label宽度
        },
      }
      // 从 useCrud({permission}) 里获取permission参数，去设置各个按钮的权限
      // const crudPermission = useCrudPermission(context);
      // return crudPermission.merge(opts);
    },
  } as unknown as FsSetupOptions)

  // fast-extends里面的扩展组件均为异步组件，只有在使用时才会被加载，并不会影响首页加载速度
  // 安装editor
  app.use(FsExtendsEditor, {
    // 编辑器的公共配置
    wangEditor: {},
  })
  app.use(FsExtendsJson)
  app.use(FsExtendsCopyable)
  const { proxyPattern } = getServiceEnvConfig(import.meta.env)
  // 安装uploader 公共参数
  const uploaderOptions: FsUploaderOptions = {
    defaultType: 'form',
    form: {
      action: proxyPattern + Source.adminFileUpload,
      name: 'file',
      withCredentials: false,
      uploadRequest: async (props) => {
        const { action, file, onProgress } = props
        const data = new FormData()
        data.append('file', file)
        const res = await axios.post(action, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 60000,
          onUploadProgress(progress) {
            onProgress({ percent: Math.round((progress.loaded / progress.total!) * 100) })
          },
        })
        // 上传完成后的结果，一般返回个url 或者key,具体看后台返回数据
        return res.data.data
      },
      async successHandle(res: string) {
        // 上传完成后的结果处理， 此处应转换格式为{url:xxx,key:xxx}
        return {
          url: res,
        }
      },
    },
  }
  app.use(FsExtendsUploader, uploaderOptions)

  // 安装editor
  app.use(FsExtendsEditor, {
    // 编辑器的公共配置
    wangEditor: {},
  })
  app.use(FsExtendsJson)
  app.use(FsExtendsTime)
  app.use(FsExtendsCopyable)

  const { registerMergeColumnPlugin } = useColumns()
  registerMergeColumnPlugin({
    name: 'readonly-plugin',
    order: 1,
    handle: (columnProps: ColumnCompositionProps) => {
      // 你可以在此处做你自己的处理
      // 比如你可以定义一个readonly的公共属性，处理该字段只读，不能编辑
      if (columnProps.readonly) {
        // 合并column配置
        merge(columnProps, {
          form: { show: false },
          viewForm: { show: true },
        })
      }
      return columnProps
    },
  })
}

export default {
  install,
}

export function setupFastCrud(app: App<Element>, options: FsSetupOpts = {}) {
  install(app, options)
}
