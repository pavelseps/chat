import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Connection from './lib/Connection';

Vue.config.productionTip = false;

let VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);

Vue.mixin({
    data(){
        return{
            get connection() {
                return Connection()
            }
        }
    },
    computed: {
        paramRoomId(){
            return this.$route.params.roomId;
        }
    }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
