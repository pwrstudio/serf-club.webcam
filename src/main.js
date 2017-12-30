import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import VueSocketio from 'vue-socket.io'

// Vue.use(VueSocketio, 'http://34.203.130.113:8080')
Vue.use(VueSocketio, 'https://serfclubengine-udagtjujws.now.sh')
// Vue.use(VueSocketio, 'http://192.168.0.65:7070')

// --- ERROR TRACKING
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

// Raven
//     .config('https://---0@sentry.io/---')
//     .addPlugin(RavenVue, Vue)
//     .install()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
