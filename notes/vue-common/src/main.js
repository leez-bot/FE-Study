import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router/router.js'
import store from './store/index'
import { messages } from './libs/language'
// console.log('messages', messages)
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

let theme = localStorage.getItem('themeId') || 'dark';
localStorage.setItem('themeId', theme)
import(`./resource/iview.${theme}.css`);

import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
