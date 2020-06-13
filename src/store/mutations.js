import Vue from "vue";
import socket from "../socket";
import {Message} from "element-ui";
import fa from "element-ui/src/locale/lang/fa";

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
      // push it to otherUsers
      state.otherUsers.push(user)

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
    socket.emit("login", {jwt: jwt}, ok => {
      if (ok === false) {
        Message.error("jwt 验证失败！请重新登录")
      }
    })
    state.jwt = jwt
    state.isLogin = true
    state.id = id
    localStorage.setItem("jwt", jwt)
    localStorage.setItem("currentId", id)
  },

  INVALIDATE_LOGIN(state) {
    socket.emit("logoff")
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

  PUSH_NEW_MESSAGE({sessions}, [sender_id, content, type]) {
    // TODO add more logic when the session is a group session
    if (type === "group") {
      var session = sessions.find(item => item.id == 0)
    } else {
      var session = sessions.find(item => item.id == sender_id)
    }
    session.messages.push({
      content: content,
      date: new Date(),
      self: false,
      senderId: sender_id,
    });
    if (!session.unread || session.unread === 0) {
      session.unread = 1
    } else {
      session.unread++
    }
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
