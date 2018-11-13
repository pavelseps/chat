import Vue from 'vue'
import Router from 'vue-router'
import Chat from './components/Chat.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/:roomId',
            name: 'Chat',
            components: {
                default: Chat
            }
        },
        {
            path: '/*',
            name: 'ChatDefault',
            components: {
                default: Chat
            }
        },
    ]
})
