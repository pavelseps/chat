import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Connection from './lib/Connection';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserEdit, faRedo } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;

library.add(faUserEdit, faRedo, faSpinner, faComment, faBars);
Vue.component('font-awesome-icon', FontAwesomeIcon);

let VueCookie = require('vue-cookie');
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
