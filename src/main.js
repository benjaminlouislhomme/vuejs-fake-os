import { createApp } from 'vue'
import App from './App.vue'

import Drag from './Directives/Drag.js'
import Resize from './Directives/Resize.js'

import './assets/main.css'


const app = createApp(App)

app.directive('drag', Drag)
app.directive('resize', Resize)

app.mount('#app')