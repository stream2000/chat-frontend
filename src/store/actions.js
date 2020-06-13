import Axios, {AxiosInstance as axios} from "axios";
import socket from "../socket";

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
    socket.emit("msg", {
      text: content,
      receiver_id: rootState.currentSessionId,
    })
  },

  addNewIncomingMessage({commit, rootState}, msg) {
      commit("PUSH_NEW_MESSAGE",[msg.sender_id,msg.text])
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
        commit('INIT_DATA', [data.user, data.sessions])
        resolve(true)
      }))

    }))
  },

}
export default actions
