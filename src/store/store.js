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

    otherUsers: [],

    currentSessionId: -1,

    filterKey: '',

    sessions: [],
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
    if (val.length === 0) {
      return
    }
    let sessionsKey = "user-" + this.a.state.id + "-sessions"
    localStorage.setItem(sessionsKey, JSON.stringify(val));
  },
  {
    deep: true
  }
);


export default store

