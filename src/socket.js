import io from "socket.io-client"
import store from "./store/store";

const socket = io('http://127.0.0.1:8090');

socket.on("msg",msg => {
  console.log("here")
  store.dispatch("addNewIncomingMessage",msg)
})

export default socket
