import Vue from 'vue'
import Vuex from 'vuex'


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
    // 当前用户
    user: {
      name: 'coffce',
      img: './static/1.jpg'
    },
    // 会话列表
    sessions: [
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
          name: 'WEBPACKWEBPACKWEBPACK',
          img: './static/3.jpg'
        },
        messages: [],
        latest: 1,
        unread: 0
      },

    ],
    // 当前选中的会话
    currentSessionId: 1,
    // 过滤出只包含这个key的会话
    filterKey: ''
  },
  mutations: {
    INIT_DATA(state) {
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
        state.sessions = JSON.parse(data);
      }
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
      state.currentSessionId = id;
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
    initData: ({commit}) => commit('INIT_DATA'),
    sendMessage: ({commit}, content) => commit('SEND_MESSAGE', content),
    selectSession: ({commit}, id) => commit('SELECT_SESSION', id),
    search: ({commit}, value) => commit('SET_FILTER_KEY', value)
  }
});

store.watch(
  (state) => state.sessions,
  (val) => {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
  },
  {
    deep: true
  }
);


export default store

