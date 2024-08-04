import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import http from '@/utils/http'

const app = createApp(App)
// app.config.globalProperties.$http = http;
app.mount('#app')

