<script>
  import {mapGetters, mapState} from "vuex"
  import Vue from 'vue'
  import MessageHeader from './message-header'

  export default {
    components: {MessageHeader},
    computed: {
      ...mapGetters({
          session: "currentSession"
        },
        ...mapState([
          "currentSessionId",
          "otherUsers",
          "user",
        ])
      )
    },
    methods: {
      getAvatarOfMessage(msg) {
        if (msg.self) {
          // return the avatar of current user
          return this.session.user.img
        } else {
          // sender is a "user"
          const sender = this.$store.state.otherUsers.find(u => u.id == msg.senderId)
          if (sender) {
            return sender.img
          } else {
            return ""
          }
        }
      }
    },
    filters: {
      // 将日期过滤为 hour:minutes
      time(date) {
        if (typeof date === 'string') {
          date = new Date(date);
        }
        return date.getHours() + ':' + date.getMinutes();
      }
    },
    watch: {},
    directives: {
      // 发送消息后滚动到底部
      'scroll-bottom'() {
        Vue.nextTick(function () {
          let msg = document.getElementById('scroll-part') // 获取对象
          msg.scrollTop = msg.scrollHeight - msg.clientHeight // 滚动高度
        })
      }
    }
  };
</script>

<template>
  <div class="message-wrapper">
    <message-header></message-header>
    <div class="message" id="scroll-part" v-if="session" v-scroll-bottom="session.messages">
      <ul>
        <li v-for="item in session.messages">
          <p class="time">
            <span>{{ item.date | time }}</span>
          </p>
          <div class="main" :class="{ self: item.self }">
            <img class="avatar" width="30" height="30" :src="getAvatarOfMessage(item)"/>
            <div class="text">{{ item.content }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .message-wrapper {
    display: flex;
    flex-direction: column;
  }

  .m-header {
    height: 30px;
  }

  .message {
    padding: 0 10px 10px 5px;
    overflow-y: scroll;


    li {
      margin-bottom: 10px;
    }

    .time {
      margin: 7px 0;
      text-align: center;

      > span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }

    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }

    .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: ~'calc(100% - 40px)';
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;

      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }

      .text {
        background-color: #b2e281;

        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
</style>
