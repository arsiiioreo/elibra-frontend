import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import api from '@/plugins/axios'

const app = createApp(App)

app.config.globalProperties.$api = api

app.use(router).mount('#app')
