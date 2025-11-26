import { createApp } from 'vue';
import App from './App.vue';
// 国际化语言处理
// 全局less变量
import '@/common/less/common.less'
// unocss
import 'virtual:uno.css'

// router
import router from './router';
// store
import { createPinia } from 'pinia';

const app = createApp(App);
// 注册全局变量
app.use(router);
const pinia = createPinia()
app.use(pinia);
app.mount('#app');

