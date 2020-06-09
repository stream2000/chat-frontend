import Vue from 'vue'
import Vuex from 'vuex'
import fa from "element-ui/src/locale/lang/fa";
import da from "element-ui/src/locale/lang/da";


Vue.use(Vuex);

const now = new Date();
const latest = (messages) => {
  if (messages.length === 0) {
    return 0
  } else {
    return messages[messages.length - 1].date.getTime()
  }
}

const store = new Vuex.Store({
  state: {

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
  mutations: {
    INIT_DATA(state, [user, sessionIds]) {
      // fake init
      let previousSessions = [
        {
          id: 1,
          user: {
            name: '示例介绍',
            img: './static/2.png'
          },
          messages: [
            {
              content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
              date: now
            }, {
              content: '项目地址: https://github.com/coffcer/vue-chat',
              date: now,
            }
          ],
          latest: 12,
          unread: 10,
        },
        {
          id: 2,
          user: {
            name: 'WebPack',
            img: './static/3.jpg'
          },
          messages: [],
          latest: 1,
          unread: 2
        },
      ]
      localStorage.setItem('vue-chat-session', JSON.stringify(previousSessions))
      //
      let data = localStorage.getItem('vue-chat-session');
      state.user = user
      if (data) {
        let sessions = JSON.parse(data);
        sessionIds.forEach((id) => {
          let session = sessions.find((item) => item.id === id)
          if (session) {
            state.sessions.push(session)
          }
        })
      }
    },

    SET_JWT(state, jwt) {
      state.jwt = jwt
      state.isLogin = true
      localStorage.setItem("jwt", jwt)
    },

    INVALIDATE_LOGIN(state) {
      state.isLogin = false
      state.jwt = ""
      state.sessions = []
      state.user ={
        name: '未登录',
        img: './static/no-login.jpeg'
      }
      localStorage.clear()
    },

    // 发送消息
    SEND_MESSAGE({sessions, currentSessionId}, content) {
      let session = sessions.find(item => item.id === currentSessionId);
      session.messages.push({
        content: content,
        date: new Date(),
        self: true
      });
    },
    // 选择会话
    SELECT_SESSION(state, id) {
      console.debug("")
      state.currentSessionId = id;
      let index = state.sessions.findIndex((item) => item.id === id)
      let session = state.sessions[index]
      session.unread = 0
      Vue.set(state.sessions, index, session)
    },
    // 搜索
    SET_FILTER_KEY(state, value) {
      state.filterKey = value;
    }
  },
  getters: {
    currentSession: (state) => state.sessions.find(session => session.id === state.currentSessionId)

  },
  actions: {
    initData: async ({dispatch, commit}) => {
      const jwt = localStorage.getItem("jwt")
      if (jwt == null || jwt.length === 0) {
        return new Promise(resolve => {
          resolve(false)
        })
      } else {
        commit("SET_JWT", jwt)
        let response = await dispatch('pollUserInformation')
        return new Promise(resolve => {
          resolve(response)
        })
        // init validation
      }
    },
    sendMessage: ({commit}, content) => commit('SEND_MESSAGE', content),

    selectSession: ({commit}, id) => commit('SELECT_SESSION', id),

    search: ({commit}, value) => commit('SET_FILTER_KEY', value),

    setJwt({commit}, jwt) {
      return new Promise((resolve => {
        commit("SET_JWT", jwt)
        resolve()
      }))
    },

    signOut({commit}){
      commit("INVALIDATE_LOGIN")
    },

    pollUserInformation({commit}) {
      return new Promise((resolve => {
        setTimeout(() => {
          // get the information
          let user = {
            name: 'Stream2000',
            img: './static/1.jpg'
          }
          let sessionIds = [1, 2]
          let response = {
            data: {
              user: user,
              sessionIds: sessionIds
            },
            ok: true,
            code: 200
          }
          commit('INIT_DATA',[response.data.user,response.data.sessionIds])
          resolve(true)
          // commit('INIT_DATA', [user, sessionIds])
          // commit('SET_LOGIN')
        }, 100)
      }))
    },

  }
});

store.watch(
  (state) => state.sessions,
  (val) => {
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
  },
  {
    deep: true
  }
);


export default store

