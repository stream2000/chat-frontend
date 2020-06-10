import Vue from "vue";

const now = new Date();
const mutations = {
  INIT_DATA(state, [user, otherUsers]) {
    let sessionsKey = "user-" + state.id + "-sessions"
    let data = localStorage.getItem(sessionsKey);
    if (data) {
      var storedSessions = JSON.parse(data);
    }
    state.user = user
    otherUsers.forEach((user) => {
      let session = {
        id: user.id,
        user: {
          name: user.name,
          img: user.img,
        },
        unread: 0,
        messages: [],
      }
      if (storedSessions) {
        let previousSession = storedSessions.find((item) => item.id === user.id)
        if (previousSession) {
          session.messages = previousSession.messages
        }
      }
      state.sessions.push(session)
    })
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
    state.sessions = []
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
