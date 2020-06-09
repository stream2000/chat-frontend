import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const latest = (messages) => {
  if (messages.length === 0) {
    return 0
  } else {
    return messages[messages.length - 1].date.getTime()
  }
}

const store = new Vuex.Store({
  state: {

    id: -1,

    isLogin: false,

    jwt: "",

    user: {
      name: '未登录',
      img: './static/no-login.jpeg'
    },

    currentSessionId: -1,

    filterKey: '',

    sessions: [
      // {
      //   id: 1,
      //   user: {
      //     name: '示例介绍',
      //     img: './static/2.png'
      //   },
      //   messages: [
      //     {
      //       content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
      //       date: now
      //     }, {
      //       content: '项目地址: https://github.com/coffcer/vue-chat',
      //       date: now,
      //     }
      //   ],
      //   latest: 12,
      //   unread: 10,
      // },
      // {
      //   id: 2,
      //   user: {
      //     name: 'WebPack',
      //     img: './static/3.jpg'
      //   },
      //   messages: [],
      //   latest: 1,
      //   unread: 2
      // },

    ],
  },
  getters: {
    currentSession: (state) => state.sessions.find(session => session.id === state.currentSessionId)

  },

  actions: actions,

  mutations: mutations,
});

store.watch(
  (state) => state.sessions,
  (val) => {
    let sessionsKey = "user-" + this.store.id + "-sessions"
    localStorage.setItem(sessionsKey, JSON.stringify(val));
  },
  {
    deep: true
  }
);


export default store

