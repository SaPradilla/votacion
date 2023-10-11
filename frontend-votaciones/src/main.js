import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(plugin, defaultConfig(config))
// Accede al objeto $router proporcionado 
app.config.globalProperties.$router = router

app.mount('#app')
