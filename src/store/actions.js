import Axios, {AxiosInstance as axios} from "axios";
import da from "element-ui/src/locale/lang/da";

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

  sendMessage: ({commit}, content) => commit('SEND_MESSAGE', content),

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
