import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './global/register-icons'

// 针对Elmessage、Ellodingz等样式引入组件（单独引用）
import 'element-plus/theme-chalk/el-message.css'

// createApp(App).use(router).use(pinia).use(registerIcons).mount('#app')
const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')
