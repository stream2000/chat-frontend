import io from "socket.io-client"
import store from "./store/store";
import Element from "element-ui";

const socket = io('http://47.96.156.169:8090');

socket.on("msg", msg => {
  if (store.state.isLogin)
    store.dispatch("addNewIncomingMessage", msg)
})

socket.on("newUser", msg => {
  console.log("newUser ", msg)
  if (store.state.isLogin) {
    let u = store.state.otherUsers.find(item => item.id == msg.id)
    if (u == null) {
      store.dispatch("newUserRegister", msg)
    }
  }
})

socket.on("online", msg => {
  if (store.state.isLogin) {
    store.dispatch("newUserOnline", msg)
  }
})

socket.on("offline", msg => {
  if (store.state.isLogin) {
    store.dispatch("userOffline", msg)
  }
})

socket.on("kick", (msg)=>{
  Element.Message.error("你的账号在别处上线,请重新登录！")
  store.dispatch("signOut")
})

export default socket
