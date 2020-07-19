import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/* eslint-disable*/
//以下的所有代码就不做代码检查了
const age = 10
if (age == '10') {
  console.log('goods')
}

new Vue({
  render: h => h(App)
}).$mount('#app')
