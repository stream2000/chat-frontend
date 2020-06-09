import Vue from "vue";

const now = new Date();
const mutations = {
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
    let sessionsKey = "user-" + state.id + "-sessions"
    let data = localStorage.getItem(sessionsKey);
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

  SET_LOGIN(state, [jwt, id]) {
    state.jwt = jwt
    state.isLogin = true
    state.id = id
    localStorage.setItem("jwt", jwt)
    localStorage.setItem("currentId", id)
  },

  INVALIDATE_LOGIN(state) {
    state.isLogin = false
    state.jwt = ""
    state.sessions.clear()
    state.id = -1
    state.user = {
      name: '未登录',
      img: './static/no-login.jpeg'
    }
    localStorage.removeItem("jwt")
    localStorage.removeItem("currentId")
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
    let index = state.sessions.findIndex((item) => item.id === id)
    let session = state.sessions[index]
    session.unread = 0
    Vue.set(state.sessions, index, session)
  },
  // 搜索
  SET_FILTER_KEY(state, value) {
    state.filterKey = value;
  }
}

export default mutations
