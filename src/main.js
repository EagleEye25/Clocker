import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import router from './router'
import store from './store/store';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueCtkDateTimePicker,
  render: h => h(App)
}).$mount('#app')
