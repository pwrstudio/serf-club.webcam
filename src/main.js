import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import VueSocketio from 'vue-socket.io'

// Vue.use(VueSocketio, 'http://34.203.130.113:8080')
// Vue.use(VueSocketio, 'https://serfclubengine.now.sh')
// Vue.use(VueSocketio, 'http://192.168.178.25:7070')
// Vue.use(VueSocketio, 'http://localhost:7070')
Vue.use(VueSocketio, 'https://serfclubengine.now.sh')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
