/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// SVG 组件导入
declare module '*.svg?component' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// SVG URL 导入
declare module '*.svg?url' {
  const url: string
  export default url
}

// 图片导入
declare module '*.png' {
  const url: string
  export default url
}

declare module '*.jpg' {
  const url: string
  export default url
}

declare module '*.jpeg' {
  const url: string
  export default url
}

declare module '*.gif' {
  const url: string
  export default url
}

declare module '*.webp' {
  const url: string
  export default url
}

interface ImportMetaEnv {
  readonly VITE_HOME_URL: string
  readonly VITE_ANALYZE: string
  readonly MODE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

