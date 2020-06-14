import Axios, {AxiosInstance as axios} from "axios";
import socket from "../socket";
import Element from "element-ui";

const actions = {
  initData: async ({dispatch, commit}) => {
    const jwt = localStorage.getItem("jwt")
    const id = localStorage.getItem("currentId")
    if (jwt == null || jwt.length === 0) {
      return new Promise(resolve => {
        resolve(false)
      })
    } else {
      commit("SET_LOGIN", [jwt, id])
      let response = await dispatch('pollUserInformation')
      return new Promise(resolve => {
        resolve(response)
      })
      // init validation
    }
  },

  sendMessage: ({commit, rootState}, content) => {
    commit('SEND_MESSAGE', content)
    if (rootState.currentSessionId === 0) {
      socket.emit("group", {
        text: content,
        receiver_id: rootState.currentSessionId,
      })
    } else {
      socket.emit("msg", {
        text: content,
        receiver_id: rootState.currentSessionId,
      })
    }
  },

  addNewIncomingMessage({commit, rootState}, msg) {
    commit("PUSH_NEW_MESSAGE", [msg.sender_id, msg.text, msg.type])
  },
  selectSession: ({commit}, id) => commit('SELECT_SESSION', id),

  search: ({commit}, value) => commit('SET_FILTER_KEY', value),

  setJwt({commit}, [jwt, id]) {
    return new Promise((resolve => {
      commit("SET_LOGIN", [jwt, id])
      resolve()
    }))
  },

  signOut({commit}) {
    commit("INVALIDATE_LOGIN")
  },

  pollUserInformation({commit}) {
    return new Promise((resolve => {
      Axios.get("/api/init").then((r => {
        let data = r.data.data
        let otherUsers = []
        otherUsers.push({
          id: 0,
          name: "默认群聊",
          img: "/static/1.jpg"
        })
        data.sessions.forEach(item => otherUsers.push(item))
        commit('INIT_DATA', [data.user, otherUsers])
        resolve(true)
      }))

    }))
  },

  newUserRegister({commit}, newUser) {
    commit("ADD_NEW_USER", newUser)
  },

  newUserOnline({rootState, commit}, id) {
    let u = rootState.otherUsers.find(item => item.id === id)
    Element.Message.info("用户[" + u.name + "]上线了")
  },

  userOffline({rootState, commit}, id) {
    let u = rootState.otherUsers.find(item => item.id === id)
    Element.Message.info("用户[" + u.name + "]下线了")
  },

}
export default actions
