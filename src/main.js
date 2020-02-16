import Vue from 'vue'
import App from './views/App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'


import dotenv from 'dotenv';
dotenv.config()

Vue.config.productionTip = false

new Vue({
    store,
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
