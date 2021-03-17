import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueCustomElement from 'vue-custom-element'
import Modal from 'ant-design-vue/lib/modal' //lo llamo aqui porque daba problemas en vue-ant-desing.js

// (optional) 'Custom elements polyfill'
import 'document-register-element/build/document-register-element'
Vue.use(vueCustomElement)
//plugin
require('./plugins') //inclue antDesign para el calendar
Vue.use(Modal)

Vue.config.productionTip = false

App.store = store
App.router = router
Vue.customElement('calendar-widget', App)


