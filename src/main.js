import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import './permission'
import "./scss/app.scss"

import Message from 'vue-m-message'
import 'vue-m-message/dist/index.css'

// v-md-editor
import VMdEditor from '@kangc/v-md-editor'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index'

import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import 'prismjs/components/prism-json'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'

VMdEditor.use(vuepressTheme)
VMdEditor.use(createTipPlugin())

Vue.use(Message)
Vue.use(VMdEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
