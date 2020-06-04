import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        // 域名
        apiUrl: 'http://127.0.0.1/api/',
        staticUrl: 'http://127.0.0.1/image/',
        wsUrl: 'ws://edk24.com:778',

        // 用户状态
        login: false,
        token: '', // 用户token
        userInfo: {
            id: 0,  // 用户id
            name: '', // 用户昵称
            avatar:'', // 头像url
        }
    },
    mutations: {
        login(state, provider) {
            state.login = true;
            state.token = provider.token;
            state.userInfo.avatar = provider.avatar;
            state.userInfo.name = provider.nickname;
            state.userInfo.id = provider.id;
        },
        logout(state) {
            state.login = false;
            state.token = '';
            state.userInfo.avatar = '';
            state.userInfo.name = '';
            state.userInfo.id = 0;
        },
    },
    getters: {
        apiUrl: state => {
            return state.apiUrl
        },
        token: state => {
            return state.token
        }
    }
})
export default store
